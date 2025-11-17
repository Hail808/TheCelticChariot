import { prisma } from './prisma';

export class CartService {
  // Get or create cart for user or guest
  static async getOrCreateCart(userId?: string, sessionId?: string) {
    if (!userId && !sessionId) {
      throw new Error('Either userId or sessionId is required');
    }

    // Build where clause based on what's provided
    const where = userId 
      ? { userId } 
      : { sessionId: sessionId! };

    let cart = await prisma.cart.findUnique({
      where,
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: userId || null,
          sessionId: sessionId || null,
        } as any,
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    }

    return cart;
  }

  // Merge guest cart into user cart upon login
  static async mergeGuestCart(sessionId: string, userId: string) {
    const guestCart = await prisma.cart.findUnique({
      where: { sessionId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!guestCart || guestCart.items.length === 0) {
      return null; // No guest cart to merge
    }

    // Get or create user cart
    const userCart = await this.getOrCreateCart(userId);

    // Merge items from guest cart to user cart
    for (const guestItem of guestCart.items) {
      // Check if product exists in user cart
      const existingItem = await prisma.cartItem.findUnique({
        where: {
          cartId_productId: {
            cartId: userCart.id,
            productId: guestItem.productId,
          },
        },
      });

      if (existingItem) {
        // Combine quantities
        const newQuantity = existingItem.quantity + guestItem.quantity;
        
        // Check inventory
        if (guestItem.product.inventory >= newQuantity) {
          await prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: newQuantity },
          });
        } else {
          // Max out at available inventory
          await prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: guestItem.product.inventory },
          });
        }
      } else {
        // Move item to user cart
        await prisma.cartItem.update({
          where: { id: guestItem.id },
          data: { cartId: userCart.id },
        });
      }
    }

    // Delete guest cart
    await prisma.cart.delete({
      where: { id: guestCart.id },
    });

    return await this.getOrCreateCart(userId);
  }

  // Add item to cart
  static async addItem(productId: number, quantity: number, userId?: string, sessionId?: string) {
    if (!userId && !sessionId) {
      throw new Error('Either userId or sessionId is required');
    }
    
    // Validate product exists and has inventory
    const product = await prisma.product.findUnique({
      where: { product_id: productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    if (product.inventory < quantity) {
      throw new Error(`Insufficient inventory. Only ${product.inventory} available`);
    }

    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    // Get or create cart
    const cart = await this.getOrCreateCart(userId, sessionId);

    // Check if item already in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId,
        },
      },
    });

    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + quantity;
      
      if (product.inventory < newQuantity) {
        throw new Error(`Cannot add ${quantity} more. Only ${product.inventory - existingItem.quantity} available`);
      }

      return await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
        include: { product: true },
      });
    } else {
      // Create new cart item
      return await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: productId,
          quantity: quantity,
          priceAtAddition: product.price,
        },
        include: { product: true },
      });
    }
  }

  // Update cart item quantity
  static async updateItemQuantity(itemId: number, quantity: number, userId?: string, sessionId?: string) {
    if (!userId && !sessionId) {
      throw new Error('Either userId or sessionId is required');
    }

    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: {
        cart: true,
        product: true,
      },
    });

    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    // Verify ownership
    const isOwner = userId 
      ? cartItem.cart.userId === userId
      : cartItem.cart.sessionId === sessionId;

    if (!isOwner) {
      throw new Error('Cart item not found');
    }

    if (cartItem.product.inventory < quantity) {
      throw new Error(`Insufficient inventory. Only ${cartItem.product.inventory} available`);
    }

    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    return cartItem.cart;
  }

  // Remove item from cart
  static async removeItem(itemId: number, userId?: string, sessionId?: string) {
    if (!userId && !sessionId) {
      throw new Error('Either userId or sessionId is required');
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true },
    });

    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    // Verify ownership
    const isOwner = userId 
      ? cartItem.cart.userId === userId
      : cartItem.cart.sessionId === sessionId;

    if (!isOwner) {
      throw new Error('Cart item not found');
    }

    await prisma.cartItem.delete({
      where: { id: itemId },
    });
    return cartItem.cart;
  }

  // Clear entire cart
  static async clearCart(userId?: string, sessionId?: string) {
    if (!userId && !sessionId) {
      throw new Error('Either userId or sessionId is required');
    }

    const where = userId 
      ? { userId } 
      : { sessionId: sessionId! };

    const cart = await prisma.cart.findUnique({
      where,
    });

    if (!cart) {
      return null;
    }

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return cart;
  }

  // Calculate cart totals
  static async calculateTotals(userId?: string, sessionId?: string) {
    if (!userId && !sessionId) {
      throw new Error('Either userId or sessionId is required');
    }

    const cart = await this.getOrCreateCart(userId, sessionId);

    const subtotal = cart.items.reduce((sum, item) => {
      return sum + Number(item.priceAtAddition) * item.quantity;
    }, 0);

    const taxRate = 0.08; // 8% tax
    const tax = subtotal * taxRate;
    
    const shipping = subtotal >= 50 ? 0 : 4.99; // Free shipping over $50
    
    const total = subtotal + tax + shipping;

    return {
      subtotal: Number(subtotal.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      shipping: Number(shipping.toFixed(2)),
      total: Number(total.toFixed(2)),
      itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
    };
  }

  // Validate cart inventory
  static async validateInventory(userId?: string, sessionId?: string) {
    if (!userId && !sessionId) {
      throw new Error('Either userId or sessionId is required');
    }

    const cart = await this.getOrCreateCart(userId, sessionId);

    const invalidItems = [];

    for (const item of cart.items) {
      if (item.product.inventory < item.quantity) {
        invalidItems.push({
          itemId: item.id,
          productId: item.productId,
          productName: item.product.product_name,
          requestedQuantity: item.quantity,
          availableQuantity: item.product.inventory,
        });
      }
    }

    return {
      isValid: invalidItems.length === 0,
      invalidItems,
    };
  }
}
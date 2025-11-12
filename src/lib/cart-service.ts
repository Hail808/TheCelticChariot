import { prisma } from './prisma';


export class CartService {
  // Get or create cart for user
  static async getOrCreateCart(userId: string) {
    let cart = await prisma.cart.findUnique({
      where: { userId },
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
        data: { userId } as any,
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

  // Add item to cart
  static async addItem(userId: string, productId: number, quantity: number) {
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
    const cart = await this.getOrCreateCart(userId);

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
  static async updateItemQuantity(userId: string, itemId: number, quantity: number) {
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

    if (!cartItem || cartItem.cart.userId !== userId) {
      throw new Error('Cart item not found');
    }

    if (cartItem.product.inventory < quantity) {
      throw new Error(`Insufficient inventory. Only ${cartItem.product.inventory} available`);
    }

    return await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
      include: { product: true },
    });
  }

  // Remove item from cart
  static async removeItem(userId: string, itemId: number) {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true },
    });

    if (!cartItem || cartItem.cart.userId !== userId) {
      throw new Error('Cart item not found');
    }

    return await prisma.cartItem.delete({
      where: { id: itemId },
    });
  }

  // Clear entire cart
  static async clearCart(userId: string) {
    const cart = await prisma.cart.findUnique({
      where: { userId },
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
  static async calculateTotals(userId: string) {
    const cart = await this.getOrCreateCart(userId);

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
  static async validateInventory(userId: string) {
    const cart = await this.getOrCreateCart(userId);

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
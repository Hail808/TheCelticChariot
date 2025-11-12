import { NextRequest, NextResponse } from 'next/server';
import { CartService } from '../../../../../lib/cart-service';
import { requireAuth } from '../../../../../lib/auth';

// POST /api/cart/items - adding item to cart
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    
    const { productId, quantity } = body;

    if (!productId || !quantity) {
      return NextResponse.json(
        { success: false, error: 'Missing productId or quantity' },
        { status: 400 }
      );
    }

    await CartService.addItem(user.id, Number(productId), Number(quantity));
    
    // return updated cart
    const cart = await CartService.getOrCreateCart(user.id);

    return NextResponse.json({
      success: true,
      data: cart,
      message: 'Item added to cart',
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
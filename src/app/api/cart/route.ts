import { NextResponse } from 'next/server';
import { CartService } from '../../../lib/cart-service';
import { requireAuth } from '../../../lib/auth';

// GET /api/cart - get user's cart
export async function GET() {
  try {
    const user = await requireAuth();
    const cart = await CartService.getOrCreateCart(user.id);

    return NextResponse.json({
      success: true,
      data: cart,
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
      { status: 500 }
    );
  }
}

// DELETE /api/cart - clears cart
export async function DELETE() {
  try {
    const user = await requireAuth();
    await CartService.clearCart(user.id);

    return NextResponse.json({
      success: true,
      message: 'Cart cleared successfully',
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
      { status: 500 }
    );
  }
}
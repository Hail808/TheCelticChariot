import { NextRequest, NextResponse } from 'next/server';
import { CartService } from '../../../../../lib/cart-service';
import { requireAuth } from '../../../../../lib/auth';

// PATCH /api/cart/items/:id - updates item quantity
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { id } = await context.params;
    const { quantity } = body;
    const itemId = parseInt(id, 10);

    if (!quantity) {
      return NextResponse.json(
        { success: false, error: 'Missing quantity' },
        { status: 400 }
      );
    }

    await CartService.updateItemQuantity(user.id, itemId, Number(quantity));
    
    // returns updated cart
    const cart = await CartService.getOrCreateCart(user.id);

    return NextResponse.json({
      success: true,
      data: cart,
      message: 'Item updated',
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

// DELETE /api/cart/items/:id - removes item
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    const { id } = await context.params;
    const itemId = parseInt(id);

    await CartService.removeItem(user.id, itemId);
    
    // returns updated cart
    const cart = await CartService.getOrCreateCart(user.id);

    return NextResponse.json({
      success: true,
      data: cart,
      message: 'Item removed',
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
import { NextRequest, NextResponse } from 'next/server';
import { CartService } from '../../../../../lib/cart-service';
import { auth } from '../../../../../lib/auth';

// PATCH /api/cart/items/:id - updates item quantity
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await context.params;
    const { quantity } = body;
    const itemId = parseInt(id, 10);
   
    const session = await auth.api.getSession({ headers: request.headers });
    let userId: string | undefined = session?.user?.id;
    let sessionId: string;
    if (session) {
        sessionId = session.session.id;
      } else {
        // Get guest session from cookie
        const guestSessionId = request.cookies.get('guest_session_id')?.value;
        
        if (!guestSessionId) {
          return NextResponse.json(
            { success: false, error: 'No cart found' },
            { status: 404 }
          );
        }
        
        sessionId = guestSessionId;
      }

    if (!quantity) {
      return NextResponse.json(
        { success: false, error: 'Missing quantity' },
        { status: 400 }
      );
    }

    const cart = await CartService.updateItemQuantity(itemId, Number(quantity), userId, sessionId);
    

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
    const session = await auth.api.getSession({ headers: request.headers });
    
    let userId: string | undefined = session?.user?.id;
    let sessionId: string;

    if (session) {
      sessionId = session.session.id;
    } else {
      // Get guest session from cookie
      const guestSessionId = request.cookies.get('guest_session_id')?.value;
      
      if (!guestSessionId) {
        return NextResponse.json(
          { success: false, error: 'No cart found' },
          { status: 404 }
        );
      }
      
      sessionId = guestSessionId;
    }

    const { id } = await context.params;
    const itemId = parseInt(id);

    // Returns updated cart
    const cart = await CartService.removeItem(itemId, userId, sessionId);

    return NextResponse.json({
      success: true,
      data: cart,
      message: 'Item removed',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { CartService } from '../../../../lib/cart-service';
import { auth } from '../../../../lib/auth';
import { v4 as uuidv4 } from 'uuid';

// POST /api/cart/items - adding item to cart
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    // Get userId and sessionId (or generate guest session)
    let userId: string | undefined = session?.user?.id;
    let sessionId: string;

    if (session) {
      sessionId = session.session.id;
    } else {
      // Generate guest session ID from cookie or create new one
      const cookies = request.cookies;
      sessionId = cookies.get('guest_session_id')?.value || uuidv4();
    }

    const body = await request.json();
    const { productId, quantity } = body;

    if (!productId || !quantity) {
      return NextResponse.json(
        { success: false, error: 'Missing productId or quantity' },
        { status: 400 }
      );
    }

    await CartService.addItem(Number(productId), Number(quantity), userId, sessionId);
    
    const cart = await CartService.getOrCreateCart(userId, sessionId);

    const response = NextResponse.json({
      success: true,
      data: cart,
      message: 'Item added to cart',
    });

    // Set guest session cookie if new guest
    if (!session) {
      response.cookies.set('guest_session_id', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { CartService } from '../../../lib/cart-service';
import { auth } from '../../../lib/auth';
import { v4 as uuidv4 } from 'uuid';

// Helper function to get session identifiers
function getSessionIdentifiers(request: NextRequest, session: any) {
  let userId: string | undefined = session?.user?.id;
  let sessionId: string;

  if (session) {
    sessionId = session.session.id;
  } else {
    // Get guest session from cookie
    const guestSessionId = request.cookies.get('guest_session_id')?.value;
    sessionId = guestSessionId || uuidv4();
  }

  return { userId, sessionId, isNewGuest: !session && !request.cookies.get('guest_session_id')?.value };
}

// GET /api/cart - get user's cart
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    const { userId, sessionId } = getSessionIdentifiers(request, session);

    const cart = await CartService.getOrCreateCart(userId, sessionId);

    const response = NextResponse.json({
      success: true,
      data: cart,
    });

    // Set guest session cookie if new guest
    if (!session && !request.cookies.get('guest_session_id')?.value) {
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
      { status: 500 }
    );
  }
}

// POST /api/cart/items - add item to cart
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    const { userId, sessionId, isNewGuest } = getSessionIdentifiers(request, session);

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
    if (isNewGuest) {
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

// DELETE /api/cart - clears cart
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    const { userId, sessionId } = getSessionIdentifiers(request, session);

    await CartService.clearCart(userId, sessionId);

    return NextResponse.json({
      success: true,
      message: 'Cart cleared successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
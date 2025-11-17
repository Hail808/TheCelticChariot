import { auth } from '../../../lib/auth';
import { NextResponse, NextRequest } from 'next/server';
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
});

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

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();
    const curSession = await auth.api.getSession({
      headers: request.headers,
    });

    const { userId, sessionId, isNewGuest } = getSessionIdentifiers(request, curSession);

    // If new guest, set the cookie
    const response = NextResponse.json({ success: true });
    if (isNewGuest) {
      response.cookies.set('guest_session_id', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      });
    }

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image ? `${process.env.NEXT_PUBLIC_BASE_URL}${item.image}` : undefined].filter(Boolean),
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

  
    

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      shipping_address_collection: {
        allowed_countries: ['US'], 
      },
      shipping_options: [
        { shipping_rate: process.env.GROUND_SHIPPING_RATE_ID! },
        { shipping_rate: process.env.PRIORITY_SHIPPING_RATE_ID! },
      ],
        automatic_tax: {
          enabled: true,
      },
      billing_address_collection: 'required',
      customer_creation: 'always',
      metadata: {
        userId: userId || '',
        sessionId: sessionId || '',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
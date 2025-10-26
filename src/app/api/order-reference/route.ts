import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    // Get the Stripe session to find the payment intent or customer email
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const customerEmail = session.customer_details?.email;

    if (!customerEmail) {
      return NextResponse.json({ error: 'Customer email not found' }, { status: 404 });
    }

    // Find the most recent order for this email
    const order = await prisma.orders.findFirst({
      where: {
        guest: {
          email: customerEmail
        }
      },
      orderBy: {
        order_date: 'desc'
      },
      select: {
        reference: true
      }
    });

    if (!order || !order.reference) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ reference: order.reference });
  } catch (error) {
    console.error('Error fetching order reference:', error);
    return NextResponse.json({ error: 'Failed to fetch order reference' }, { status: 500 });
  }
}
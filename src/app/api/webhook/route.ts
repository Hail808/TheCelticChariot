import { NextResponse } from 'next/server';
import {CartService} from "../../../lib/cart-service"
import Stripe from 'stripe';
import { getSessionId, getUserId } from '@/lib/analytics';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Payment was successful
        console.log('Payment successful!', session.id);
        await fulfillOrder(session);
        break;

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('PaymentIntent was successful!', paymentIntent.id);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', failedPayment.id);
        // TODO: Notify customer of failed payment
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function fulfillOrder(session: Stripe.Checkout.Session) {
  // Get the full session details including line items
  const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ['line_items','shipping_cost.shipping_rate', 'total_details', 'customer_details'],
  });


  // Shipping details are in customer_details.address or shipping_details
  const shippingAddr = fullSession.customer_details?.address || (fullSession as any).shipping_details?.address;

  // Save order to database
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    const fullName = fullSession.customer_details?.name || 'Guest';
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const customerEmail = fullSession.customer_details?.email || '';
    const shippingAddr = fullSession.customer_details?.address || (fullSession as any).shipping_details?.address;
    const shippingRate = fullSession.shipping_cost?.shipping_rate;
    const shippingMethod = typeof shippingRate === 'string' 
      ? shippingRate 
      : shippingRate?.display_name || 'N/A';
    const shippingAmount = fullSession.shipping_cost?.amount_total / 100 || 0;
    const taxAmount = fullSession.total_details?.amount_tax / 100 || 0;

    let addressId = null;

    // Create shipping address
    if (shippingAddr) {
      const newAddress = await prisma.address.create({
        data: {
          street_line1: shippingAddr.line1 || '',
          street_line2: shippingAddr.line2 || null,
          city: shippingAddr.city || '',
          state: shippingAddr.state || null,
          postal_code: shippingAddr.postal_code || null,
          country: shippingAddr.country || '',
        },
      });
      addressId = newAddress.address_id;
    }

    // Check if user account exists with this email
    let existingUser;
    try {
      existingUser = await prisma.user.findUnique({
        where: { email: customerEmail },
        include: { guest: true },
      });
    } catch (dbError: any) {
      console.error('Database connection error:', dbError.message);
      throw new Error('Database temporarily unavailable. Stripe will retry this webhook.');
    }

    let guestId: number;

    if (existingUser && existingUser.guest_id) {
      // User has an account - use their existing guest record
      guestId = existingUser.guest_id;
      
      // Update guest record with latest info if needed
      await prisma.guest.update({
        where: { guest_id: guestId },
        data: {
          first_name: firstName,
          last_name: lastName,
          fk_ship_address_id: addressId,
          fk_bill_address_id: addressId,
        },
      });
      
      console.log(`Order for registered user: ${customerEmail}`);
    } else {
      // Check if guest record already exists with this email
      const existingGuest = await prisma.guest.findFirst({
        where: { email: customerEmail },
      });

      if (existingGuest) {
        // Guest already exists, reuse it
        guestId = existingGuest.guest_id;
        
        // Update with new address
        await prisma.guest.update({
          where: { guest_id: guestId },
          data: {
            fk_ship_address_id: addressId,
            fk_bill_address_id: addressId,
          },
        });
        
        console.log(`Reusing existing guest record for: ${customerEmail}`);
      } else {
        // No account or guest record - create new guest entry
        const newGuest = await prisma.guest.create({
          data: {
            email: customerEmail,
            phone_num: '',
            fk_ship_address_id: addressId,
            fk_bill_address_id: addressId,
          },
        });
        guestId = newGuest.guest_id;
        
        console.log(`Order created as guest checkout: ${customerEmail}`);
      }
    }

    // Generate unique order reference (just the verification code)
    const orderReference = `${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
    
    // Create the order linked to guest
    const order = await prisma.orders.create({
      data: {
        reference: orderReference, // Store the full reference
        order_date: new Date(),
        total_price: (fullSession.amount_total || 0) / 100,
        order_status: 'Paid',
        shipping_cost: shippingAmount,
        shipping_method: shippingMethod,
        fk_ship_address_id: addressId,
        fk_bill_address_id: addressId,
        fk_guest_id: guestId,
        tax: taxAmount
      },
    });

    console.log(`Order created: ${orderReference}`);

    // Create order items
    if (fullSession.line_items?.data) {
      for (const item of fullSession.line_items.data) {
        // Try to find matching product by name
        const product = await prisma.product.findFirst({
          where: {
            product_name: {
              contains: item.description || '',
              mode: 'insensitive',
            },
          },
        });

        await prisma.order_item.create({
          data: {
            fk_order_id: order.order_id,
            fk_product_id: product?.product_id || null,
            quantity: item.quantity || 1,
            price: (item.amount_total || 0) / 100, // Convert cents to dollars
          },
        });

        // Update product inventory if found
        if (product) {
          await prisma.product.update({
            where: { product_id: product.product_id },
            data: {
              inventory: {
                decrement: item.quantity || 1,
              },
            },
          });
        }
      }
    }

    // Create invoice with shorter invoice number
    const invoiceNumber = `INV-${order.reference}`;
    
    await prisma.invoice.create({
      data: {
        fk_order_id: order.order_id,
        invoice_number: invoiceNumber,
        invoice_date: new Date(),
        total_price: (fullSession.amount_total || 0) / 100,
        due_date: new Date(),
        payment_status: 'paid',
      },
    });

    // Create payment record
    const invoice = await prisma.invoice.findUnique({
      where: { fk_order_id: order.order_id },
    });

    if (invoice) {
      await prisma.payment.create({
        data: {
          fk_invoice_id: invoice.invoice_id,
          payment_method: 'stripe',
          payment_date: new Date(),
          amount_paid: (fullSession.amount_total || 0) / 100,
        },
      });
    }


    await CartService.clearCart(getUserId());

    await prisma.$disconnect();
    console.log(`Order ${order.order_id} saved successfully for guest ${guestId}`);
  } catch (error) {
    console.error('Failed to save order to database:', error);
  }

  // 2. Send confirmation email to customer
  // TODO: Implement email sending (see below for examples)

  // 5. Create shipping label
  // TODO: Integrate with shipping provider
}
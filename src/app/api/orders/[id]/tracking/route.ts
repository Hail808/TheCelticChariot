// app/api/orders/[orderId]/tracking/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }  
) {
  try {
    const { tracking_number } = await req.json();
    const { id } = await params;
    if (!tracking_number) {
      return NextResponse.json(
        { error: 'Tracking number is required' },
        { status: 400 }
      );
    }

    // Get order and address info
    const order = await prisma.orders.findUnique({
      where: { reference: id},
      select: { 
        fk_ship_address_id: true,
        order_id: true
       },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Create or update shipping record
    const shipping = await prisma.shipping.upsert({
      where: { fk_order_id: order.order_id },
      create: {
        fk_order_id: order.order_id,
        tracking_num: tracking_number,
        carrier: 'USPS', 
        shipping_status: 'shipped',
        fk_shipping_address_id: order.fk_ship_address_id,
      },
      update: {
        tracking_num: tracking_number,
        shipping_status: 'shipped',
      },
    });

    return NextResponse.json({ success: true, shipping });
  } catch (error) {
    console.error('Error saving tracking number:', error);
    return NextResponse.json(
      { error: 'Failed to save tracking number' },
      { status: 500 }
    );
  }
}
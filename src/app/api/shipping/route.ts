import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// GET all shipping records
export async function GET() {
  try {
    const shippingRecords = await prisma.shipping.findMany({
      include: {
        orders: {
          select: {
            order_id: true,
            order_date: true,
            customer: {
              select: {
                first_name: true,
                last_name: true,
                email: true,
              },
            },
            guest: {
              select: {
                email: true,
              },
            },
          },
        },
        address: {
          select: {
            street_line1: true,
            street_line2: true,
            city: true,
            state: true,
            postal_code: true,
            country: true,
          },
        },
      },
      orderBy: {
        shipping_id: 'desc',
      },
    });

    return NextResponse.json(shippingRecords);
  } catch (error) {
    console.error('Error fetching shipping records:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shipping records' },
      { status: 500 }
    );
  }
}

// CREATE new shipping record
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      fk_order_id, 
      fk_shipping_address_id, 
      tracking_num, 
      carrier, 
      shipping_status 
    } = body;

    if (!carrier) {
      return NextResponse.json(
        { error: 'Carrier is required' },
        { status: 400 }
      );
    }

    const newShipping = await prisma.shipping.create({
      data: {
        fk_order_id: fk_order_id ? parseInt(fk_order_id) : null,
        fk_shipping_address_id: fk_shipping_address_id ? parseInt(fk_shipping_address_id) : null,
        tracking_num: tracking_num || null,
        carrier,
        shipping_status: shipping_status || 'not_yet_shipped',
      },
    });

    return NextResponse.json(newShipping, { status: 201 });
  } catch (error) {
    console.error('Error creating shipping record:', error);
    return NextResponse.json(
      { error: 'Failed to create shipping record' },
      { status: 500 }
    );
  }
}
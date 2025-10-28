import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { requireAuth } from '../../../lib/auth';

// GET all shipping records
export async function GET() {
  try {
    await requireAuth();
    
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
    
    return NextResponse.json({
      success: true,
      data: shippingRecords,
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    console.error('Error fetching shipping records:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch shipping records' },
      { status: 500 }
    );
  }
}

// CREATE new shipping record
export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    
    const body = await request.json();
    const { 
      fk_order_id, 
      fk_shipping_address_id,
      shipping_method,
      tracking_num, 
      carrier, 
      shipping_status 
    } = body;
    
    if (!carrier) {
      return NextResponse.json(
        { success: false, error: 'Carrier is required' },
        { status: 400 }
      );
    }
    
    const newShipping = await prisma.shipping.create({
      data: {
        fk_order_id: fk_order_id ? parseInt(fk_order_id) : null,
        fk_shipping_address_id: fk_shipping_address_id ? parseInt(fk_shipping_address_id) : null,
        shipping_method: shipping_method || null,
        tracking_num: tracking_num || null,
        carrier,
        shipping_status: shipping_status || 'not_yet_shipped',
      },
    });
    
    return NextResponse.json({
      success: true,
      data: newShipping,
      message: 'Shipping record created',
    }, { status: 201 });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    console.error('Error creating shipping record:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create shipping record' },
      { status: 500 }
    );
  }
}
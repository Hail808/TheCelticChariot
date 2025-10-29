import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { requireAuth } from '../../../../lib/auth';

// GET single shipping record
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    
    const { id } = await params;
    const shippingId = parseInt(id);
    
    if (isNaN(shippingId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid shipping ID' },
        { status: 400 }
      );
    }
    
    const shipping = await prisma.shipping.findUnique({
      where: { shipping_id: shippingId },
      include: {
        orders: {
          include: {
            customer: true,
            guest: true,
          },
        },
        address: true,
      },
    });
    
    if (!shipping) {
      return NextResponse.json(
        { success: false, error: 'Shipping record not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: shipping,
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    console.error('Error fetching shipping record:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch shipping record' },
      { status: 500 }
    );
  }
}

// UPDATE shipping record (tracking, status, carrier, method)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    
    const { id } = await params;
    const shippingId = parseInt(id);
    
    if (isNaN(shippingId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid shipping ID' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    const { tracking_num, carrier, shipping_status, shipping_method } = body;
    
    const updatedShipping = await prisma.shipping.update({
      where: { shipping_id: shippingId },
      data: {
        tracking_num: tracking_num || undefined,
        carrier: carrier || undefined,
        shipping_status: shipping_status || undefined,
        shipping_method: shipping_method || undefined,
      },
    });
    
    return NextResponse.json({
      success: true,
      data: updatedShipping,
      message: 'Shipping record updated',
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    console.error('Error updating shipping record:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update shipping record' },
      { status: 500 }
    );
  }
}

// DELETE shipping record
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    
    const { id } = await params;
    const shippingId = parseInt(id);
    
    if (isNaN(shippingId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid shipping ID' },
        { status: 400 }
      );
    }
    
    await prisma.shipping.delete({
      where: { shipping_id: shippingId },
    });
    
    return NextResponse.json({
      success: true,
      message: 'Shipping record deleted successfully',
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    console.error('Error deleting shipping record:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete shipping record' },
      { status: 500 }
    );
  }
}
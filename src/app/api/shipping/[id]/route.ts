import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// GET single shipping record
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const shippingId = parseInt(id);

    if (isNaN(shippingId)) {
      return NextResponse.json(
        { error: 'Invalid shipping ID' },
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
        { error: 'Shipping record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(shipping);
  } catch (error) {
    console.error('Error fetching shipping record:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shipping record' },
      { status: 500 }
    );
  }
}

// UPDATE shipping record
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const shippingId = parseInt(id);

    if (isNaN(shippingId)) {
      return NextResponse.json(
        { error: 'Invalid shipping ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { tracking_num, carrier, shipping_status } = body;

    const updatedShipping = await prisma.shipping.update({
      where: { shipping_id: shippingId },
      data: {
        tracking_num: tracking_num || undefined,
        carrier: carrier || undefined,
        shipping_status: shipping_status || undefined,
      },
    });

    return NextResponse.json(updatedShipping);
  } catch (error) {
    console.error('Error updating shipping record:', error);
    return NextResponse.json(
      { error: 'Failed to update shipping record' },
      { status: 500 }
    );
  }
}

// DELETE shipping record
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const shippingId = parseInt(id);

    if (isNaN(shippingId)) {
      return NextResponse.json(
        { error: 'Invalid shipping ID' },
        { status: 400 }
      );
    }

    await prisma.shipping.delete({
      where: { shipping_id: shippingId },
    });

    return NextResponse.json({ message: 'Shipping record deleted successfully' });
  } catch (error) {
    console.error('Error deleting shipping record:', error);
    return NextResponse.json(
      { error: 'Failed to delete shipping record' },
      { status: 500 }
    );
  }
}
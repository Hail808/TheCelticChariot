import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// GET single order item
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const orderItemId = parseInt(id);

    if (isNaN(orderItemId)) {
      return NextResponse.json(
        { error: 'Invalid order item ID' },
        { status: 400 }
      );
    }

    const orderItem = await prisma.order_item.findUnique({
      where: { order_item_id: orderItemId },
      include: {
        orders: true,
        product: true,
      },
    });

    if (!orderItem) {
      return NextResponse.json(
        { error: 'Order item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(orderItem);
  } catch (error) {
    console.error('Error fetching order item:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order item' },
      { status: 500 }
    );
  }
}

// UPDATE order item
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const orderItemId = parseInt(id);

    if (isNaN(orderItemId)) {
      return NextResponse.json(
        { error: 'Invalid order item ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { quantity, price } = body;

    const updatedOrderItem = await prisma.order_item.update({
      where: { order_item_id: orderItemId },
      data: {
        quantity: quantity ? parseInt(quantity) : undefined,
        price: price ? parseFloat(price) : undefined,
      },
    });

    return NextResponse.json(updatedOrderItem);
  } catch (error) {
    console.error('Error updating order item:', error);
    return NextResponse.json(
      { error: 'Failed to update order item' },
      { status: 500 }
    );
  }
}

// DELETE order item
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const orderItemId = parseInt(id);

    if (isNaN(orderItemId)) {
      return NextResponse.json(
        { error: 'Invalid order item ID' },
        { status: 400 }
      );
    }

    await prisma.order_item.delete({
      where: { order_item_id: orderItemId },
    });

    return NextResponse.json({ message: 'Order item deleted successfully' });
  } catch (error) {
    console.error('Error deleting order item:', error);
    return NextResponse.json(
      { error: 'Failed to delete order item' },
      { status: 500 }
    );
  }
}
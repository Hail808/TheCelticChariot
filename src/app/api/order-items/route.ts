import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// GET all order items
export async function GET() {
  try {
    const orderItems = await prisma.order_item.findMany({
      include: {
        orders: {
          select: {
            order_id: true,
            order_date: true,
            order_status: true,
          },
        },
        product: {
          select: {
            product_id: true,
            product_name: true,
            prod_image_url: true,
          },
        },
      },
      orderBy: {
        order_item_id: 'desc',
      },
    });

    return NextResponse.json(orderItems);
  } catch (error) {
    console.error('Error fetching order items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order items' },
      { status: 500 }
    );
  }
}

// CREATE new order item
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fk_order_id, fk_product_id, quantity, price } = body;

    if (!fk_order_id || !fk_product_id || !quantity || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newOrderItem = await prisma.order_item.create({
      data: {
        fk_order_id: fk_order_id,
        fk_product_id: parseInt(fk_product_id),
        quantity: parseInt(quantity),
        price: parseFloat(price),
      },
    });

    return NextResponse.json(newOrderItem, { status: 201 });
  } catch (error) {
    console.error('Error creating order item:', error);
    return NextResponse.json(
      { error: 'Failed to create order item' },
      { status: 500 }
    );
  }
}
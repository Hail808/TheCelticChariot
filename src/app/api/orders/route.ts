import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    console.log('Fetching orders from database...');

    const orders = await prisma.orders.findMany({
      orderBy: {
        order_date: 'desc',
      },
      include: {
        customer: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
        guest: {
          select: {
            email: true,
          },
        },
        address: {
          select: {
            street_line1: true,
            city: true,
            state: true,
          },
        },
        order_item: {
          select: {
            quantity: true,
            price: true,
            product: {
              select: {
                product_name: true,
              },
            },
          },
        },
      },
    });

    console.log('Successfully fetched orders:', orders.length);
    return NextResponse.json(orders);
    
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch orders from database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(request: Request) {
  try {
    const items = await prisma.product.findMany({
      orderBy: {
        product_id: 'asc',
      },
      where: { private: false },
      include: {
        images: true,
        category: true, 
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch items from database' },
      { status: 500 }
    );
  }
}
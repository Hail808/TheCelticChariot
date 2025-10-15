import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma'; // Adjust path as needed

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // Changed to Promise
) {
  try {
    const { id } = await params;  // Await params first
    const productId = parseInt(id);  // Use id, not params.id

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: {
        product_id: productId,
      },
      include: {
        category: true,
        reviews: {
          include: {
            customer: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
          },
          orderBy: {
            review_date: 'desc',
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch product',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
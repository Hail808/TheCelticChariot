import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const showPrivate = searchParams.get("showPrivate") === "true";
    const items = await prisma.product.findMany({
      orderBy: {
        product_id: 'asc',
      },
      where: showPrivate ? {} : { private: false },
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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      product_name,
      price,
      description,
      inventory,
      prod_image_url,
      fk_category_id,
      additionalImages = [], 
      private: isPrivate,
    } = body;

    const newProduct = await prisma.product.create({
      data: {
        product_name,
        price: Number(price),
        description,
        inventory: Number(inventory),
        prod_image_url,
        fk_category_id: fk_category_id ? parseInt(fk_category_id) : null, 
        private: Boolean(isPrivate), 
        images: {
          create: additionalImages.map((url: string) => ({
            image_url: url,
          })),
        },
      },
      include: {
        images: true,
        category: true,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

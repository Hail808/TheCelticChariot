import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { Params } from 'better-auth/*';

export async function GET(
  request: Request,
  {  params }: { params: Promise<{ id: string }> }
) {
  try {
      const { id } = await params;
      const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { product_id: productId },
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
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  {  params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const body = await request.json();

    const { product_name, description, price, inventory, prod_image_url, fk_category_id, private: isPrivate } = body;


    const updatedProduct = await prisma.product.update({
      where: { product_id: productId },
      data: {
        product_name,
        description,
        price: parseFloat(price),
        inventory: parseInt(inventory),
        prod_image_url,
        fk_category_id: fk_category_id ? parseInt(fk_category_id) : null,
        private: Boolean(isPrivate),
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}


export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const updated = await prisma.product.update({
      where: { product_id: productId },
      data: { private: true },
    });

    return NextResponse.json({
      message: "Product hidden successfully",
      updated,
    });
  } catch (error) {
    console.error("Error hiding product:", error);
    return NextResponse.json(
      { error: "Failed to hide product" },
      { status: 500 }
    );
  }
}

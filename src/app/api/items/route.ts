import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  try {
    console.log('Testing database connection...');
    
    const result = await prisma.$queryRaw`SELECT current_database()`;
    console.log('Connected to database:', result);
    
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('Available tables:', tables);

    const items = await prisma.product.findMany({
      orderBy: {
        product_id: 'asc',
      },
    });

    console.log('Found products:', items.length);
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch items from database' },
      { status: 500 }
    );
  }
}

// CREATE new product
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { product_name, description, price, inventory, prod_image_url, fk_category_id } = body;

    // Validation
    if (!product_name || !price || inventory === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: product_name, price, inventory' },
        { status: 400 }
      );
    }

    const newProduct = await prisma.product.create({
      data: {
        product_name,
        description: description || null,
        price: parseFloat(price),
        inventory: parseInt(inventory),
        prod_image_url: prod_image_url || null,
        fk_category_id: fk_category_id ? parseInt(fk_category_id) : null,
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

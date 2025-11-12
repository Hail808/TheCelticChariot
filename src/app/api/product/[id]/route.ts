import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    //console.log('=== PRODUCT ROUTE DEBUG ===');
    
    const { id } = await params;
    const productId = parseInt(id);
    
    //console.log('🔍 Requested product ID:', productId);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Database diagnostics
    const dbName = await prisma.$queryRaw<[{ current_database: string }]>`
      SELECT current_database();
    `;
    //console.log('📊 Connected to database:', dbName[0]?.current_database);

    // Check if product table exists
    const productTableExists = await prisma.$queryRaw<[{ exists: boolean }]>`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'product'
      );
    `;
    //console.log('✅ Product table exists:', productTableExists[0]?.exists);

    if (!productTableExists[0]?.exists) {
      console.error('❌ Product table does not exist in database!');
      return NextResponse.json(
        { 
          error: 'Database not properly configured',
          database: dbName[0]?.current_database,
          message: 'Product table does not exist. Run: npx prisma db push'
        },
        { status: 500 }
      );
    }

    // Check total products
    const totalProducts = await prisma.$queryRaw<[{ count: bigint }]>`
      SELECT COUNT(*) as count FROM product;
    `;
    //console.log('📦 Total products in database:', Number(totalProducts[0]?.count));

    // Fetch the specific product
    //console.log('🔎 Fetching product with ID:', productId);
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
        images: {
          orderBy: {
            order: 'asc',
          }
        }
      },
    });

    if (!product) {
      //console.log('⚠️ Product not found with ID:', productId);
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    //console.log('✅ Product found:', product.product_name);
    //console.log('📝 Reviews count:', product.reviews.length);
    //console.log('=== END PRODUCT DEBUG ===\n');

    return NextResponse.json(product);
    
  } catch (error: any) {
    console.error('❌ Error details:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch product',
        details: error instanceof Error ? error.message : 'Unknown error',
        code: error.code,
      },
      { status: 500 }
    );
  }
}
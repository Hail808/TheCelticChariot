import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma'; // Adjust path as needed

export async function GET() {
  try {
    console.log('=== Starting reviews fetch ===');
    
    // First, test the connection
    const dbTest = await prisma.$queryRaw`SELECT current_database()`;
    console.log('Database connection successful:', dbTest);
    
    // Check what tables exist
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('Available tables:', tables);

    // Fetch reviews - use lowercase 'reviews' to match your schema
    console.log('Attempting to fetch reviews...');
    const reviews = await prisma.reviews.findMany({
      include: {
        customer: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
        product: {
          select: {
            product_name: true,
            prod_image_url: true,
          },
        },
      },
      orderBy: {
        review_date: 'desc',
      },
    });

    console.log('Successfully fetched reviews:', reviews.length);
    return NextResponse.json(reviews);
    
  } catch (error) {
    console.error('=== ERROR FETCHING REVIEWS ===');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown');
    console.error('Full error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch reviews from database',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
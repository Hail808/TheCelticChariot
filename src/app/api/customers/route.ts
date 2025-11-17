import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    console.log('Fetching customers from database...');

    const customers = await prisma.guest.findMany({
      orderBy: {
        guest_id: 'asc',
      },
      select: {
        guest_id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone_num: true,
        last_login: true, // ← Add this if you want last_login
        user: {          // ← Add this to check if guest has user account
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        orders: {
          select: {
            order_id: true,
            order_date: true,
            total_price: true,
            order_status: true,
          },
        },
        reviews: {
          select: {
            review_id: true,
            rating: true,
            review_date: true,
          },
        },
      },
    });

    // Transform the data to include useful metrics
    const customersWithMetrics = customers.map(customer => ({
      customer_id: customer.guest_id,
      first_name: customer.first_name || '',
      last_name: customer.last_name || '',
      email: customer.email,
      phone_num: customer.phone_num,
      last_login: customer.last_login,
      is_registered_user: !!customer.user,
      user_account_id: customer.user?.id || null,
      total_orders: customer.orders.length,
      total_spent: customer.orders.reduce((sum, order) => sum + Number(order.total_price), 0),
      total_reviews: customer.reviews.length,
      first_order_date: customer.orders.length > 0 
        ? customer.orders.sort((a, b) => new Date(a.order_date).getTime() - new Date(b.order_date).getTime())[0].order_date
        : null,
    }));

    console.log('Successfully fetched customers:', customersWithMetrics.length);
    return NextResponse.json(customersWithMetrics);
    
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch customers from database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
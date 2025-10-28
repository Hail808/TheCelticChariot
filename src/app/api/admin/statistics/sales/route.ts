import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

// Helper function to get date range based on timeframe
function getDateRange(timeframe: string) {
  const now = new Date();
  const endDate = new Date();
  
  // Set end date to end of current day (23:59:59.999)
  endDate.setHours(23, 59, 59, 999);
  
  let startDate = new Date();

  switch (timeframe) {
    case 'weekly':
      startDate.setDate(now.getDate() - 7);
      // Set to start of day (00:00:00)
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'monthly':
      startDate.setMonth(now.getMonth() - 1);
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'yearly':
      startDate.setFullYear(now.getFullYear() - 1);
      startDate.setHours(0, 0, 0, 0);
      break;
    default:
      startDate.setDate(now.getDate() - 7);
      startDate.setHours(0, 0, 0, 0);
  }

  // Return Date objects
  return { 
    startDate, 
    endDate 
  };
}

// Helper function to format dates for chart
function formatChartDate(date: Date, timeframe: string): string {
  if (timeframe === 'yearly') {
    return date.toLocaleDateString('en-US', { month: 'short' });
  } else if (timeframe === 'monthly') {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } else {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const timeframe = searchParams.get('timeframe') || 'weekly';
  
  const { startDate, endDate } = getDateRange(timeframe);
  
  // Convert to ISO strings for database queries
  const startDateISO = startDate.toISOString();
  const endDateISO = endDate.toISOString();

  try {
    const pool = getPool();

    // Query 1: Total revenue (calculated from order_items)
    const revenueQuery = `
      SELECT COALESCE(SUM(oi.quantity * oi.price), 0) as total_revenue
      FROM order_item oi
      JOIN orders o ON oi.fk_order_id = o.order_id
      WHERE o.order_date >= $1 AND o.order_date <= $2
    `;
    const revenueResult = await pool.query(revenueQuery, [startDateISO, endDateISO]);
    const totalRevenue = parseFloat(revenueResult.rows[0]?.total_revenue || '0');

    // Query 2: Total orders
    const ordersQuery = `
      SELECT COUNT(*) as total_orders
      FROM orders
      WHERE order_date >= $1 AND order_date <= $2
    `;
    const ordersResult = await pool.query(ordersQuery, [startDateISO, endDateISO]);
    const totalOrders = parseInt(ordersResult.rows[0]?.total_orders || '0');

    // Query 3: Average order value
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Query 4: Conversion rate (orders / unique visitors * 100)
    const visitorsQuery = `
      SELECT COUNT(DISTINCT user_id) as unique_visitors
      FROM page_views
      WHERE viewed_at >= $1 AND viewed_at <= $2
    `;
    const visitorsResult = await pool.query(visitorsQuery, [startDateISO, endDateISO]);
    const uniqueVisitors = parseInt(visitorsResult.rows[0]?.unique_visitors || '0');
    
    const conversionRate = uniqueVisitors > 0 ? (totalOrders / uniqueVisitors) * 100 : 0;

    // Query 5: Top selling products
    const topSellingQuery = `
      SELECT 
        p.product_name,
        SUM(oi.quantity) as quantity_sold,
        SUM(oi.quantity * oi.price) as revenue
      FROM order_item oi
      JOIN orders o ON oi.fk_order_id = o.order_id
      JOIN product p ON oi.fk_product_id = p.product_id
      WHERE o.order_date >= $1 AND o.order_date <= $2
      GROUP BY p.product_name
      ORDER BY revenue DESC
      LIMIT 10
    `;
    const topSellingResult = await pool.query(topSellingQuery, [startDateISO, endDateISO]);
    const topSellingProducts = topSellingResult.rows.map(row => ({
      product_name: row.product_name,
      quantity_sold: parseInt(row.quantity_sold),
      revenue: parseFloat(row.revenue)
    }));

    // Query 6: Chart data - daily sales aggregation
    const chartDataQuery = `
      SELECT 
        DATE(o.order_date) as date,
        COALESCE(SUM(oi.quantity * oi.price), 0) as revenue,
        COUNT(DISTINCT o.order_id) as orders
      FROM orders o
      LEFT JOIN order_item oi ON o.order_id = oi.fk_order_id
      WHERE o.order_date >= $1 AND o.order_date <= $2
      GROUP BY DATE(o.order_date)
      ORDER BY date ASC
    `;
    const chartDataResult = await pool.query(chartDataQuery, [startDateISO, endDateISO]);
    const chartData = chartDataResult.rows.map(row => ({
      date: formatChartDate(new Date(row.date), timeframe),
      revenue: parseFloat(row.revenue),
      orders: parseInt(row.orders)
    }));

    // Return aggregated statistics
    return NextResponse.json({
      totalRevenue,
      totalOrders,
      avgOrderValue,
      conversionRate,
      topSellingProducts,
      chartData,
      timeframe,
      dateRange: {
        start: startDate.toISOString(),
        end: endDate.toISOString()
      }
    });

  } catch (error) {
    console.error('Error fetching sales statistics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sales statistics', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
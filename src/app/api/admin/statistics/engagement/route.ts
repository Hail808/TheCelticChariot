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

    // Query 1: Total page views
    const pageViewsQuery = `
      SELECT COUNT(*) as total_views
      FROM page_views
      WHERE viewed_at >= $1 AND viewed_at <= $2
    `;
    const pageViewsResult = await pool.query(pageViewsQuery, [startDateISO, endDateISO]);
    const totalPageViews = parseInt(pageViewsResult.rows[0]?.total_views || '0');

    // Query 2: Unique visitors
    const uniqueVisitorsQuery = `
      SELECT COUNT(DISTINCT user_id) as unique_visitors
      FROM page_views
      WHERE viewed_at >= $1 AND viewed_at <= $2
    `;
    const uniqueVisitorsResult = await pool.query(uniqueVisitorsQuery, [startDateISO, endDateISO]);
    const uniqueVisitors = parseInt(uniqueVisitorsResult.rows[0]?.unique_visitors || '0');

    // Query 3: Average session duration (in seconds)
    const sessionDurationQuery = `
      SELECT AVG(session_duration) as avg_duration
      FROM user_sessions
      WHERE session_start >= $1 AND session_start <= $2
      AND session_duration IS NOT NULL
    `;
    const sessionDurationResult = await pool.query(sessionDurationQuery, [startDateISO, endDateISO]);
    const avgSessionDuration = Math.round(parseFloat(sessionDurationResult.rows[0]?.avg_duration || '0'));

    // Query 4: Bounce rate (sessions with only 1 page view)
    const bounceRateQuery = `
      SELECT 
        COUNT(*) FILTER (WHERE page_count = 1) * 100.0 / NULLIF(COUNT(*), 0) as bounce_rate
      FROM user_sessions
      WHERE session_start >= $1 AND session_start <= $2
    `;
    const bounceRateResult = await pool.query(bounceRateQuery, [startDateISO, endDateISO]);
    const bounceRate = parseFloat(bounceRateResult.rows[0]?.bounce_rate || '0');

    // Query 5: Top viewed products
    const topProductsQuery = `
      SELECT 
        p.product_name,
        COUNT(*) as views
      FROM page_views pv
      JOIN product p ON pv.product_id = p.product_id
      WHERE pv.viewed_at >= $1 AND pv.viewed_at <= $2
      AND pv.product_id IS NOT NULL
      GROUP BY p.product_name
      ORDER BY views DESC
      LIMIT 10
    `;
    const topProductsResult = await pool.query(topProductsQuery, [startDateISO, endDateISO]);
    const topProducts = topProductsResult.rows.map(row => ({
      product_name: row.product_name,
      views: parseInt(row.views)
    }));

    // Query 6: Chart data - daily aggregation
    const chartDataQuery = `
      SELECT 
        DATE(viewed_at) as date,
        COUNT(*) as views,
        COUNT(DISTINCT user_id) as visitors
      FROM page_views
      WHERE viewed_at >= $1 AND viewed_at <= $2
      GROUP BY DATE(viewed_at)
      ORDER BY date ASC
    `;
    const chartDataResult = await pool.query(chartDataQuery, [startDateISO, endDateISO]);
    const chartData = chartDataResult.rows.map(row => ({
      date: formatChartDate(new Date(row.date), timeframe),
      views: parseInt(row.views),
      visitors: parseInt(row.visitors)
    }));

    // Return aggregated statistics
    return NextResponse.json({
      totalPageViews,
      uniqueVisitors,
      avgSessionDuration,
      bounceRate,
      topProducts,
      chartData,
      timeframe,
      dateRange: {
        start: startDate.toISOString(),
        end: endDate.toISOString()
      }
    });

  } catch (error) {
    console.error('Error fetching engagement statistics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch engagement statistics' },
      { status: 500 }
    );
  }
}
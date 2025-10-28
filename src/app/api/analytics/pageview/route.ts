import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, sessionId, productId, pageUrl, userAgent, referrer } = body;
    
    // Get IP address from request
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
    
    // Use shared pool
    const pool = getPool();
    
    // Use the PostgreSQL function we created
    await pool.query(
      'SELECT track_page_view($1, $2, $3, $4, $5, $6, $7)',
      [userId, sessionId, pageUrl, productId, ipAddress, userAgent, referrer]
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking page view:', error);
    return NextResponse.json(
      { error: 'Failed to track page view', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
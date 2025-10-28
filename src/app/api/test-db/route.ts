import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export async function GET() {
  try {
    // Check environment variables
    const hasDbUrl = !!process.env.DATABASE_URL;
    const hasDbHost = !!process.env.DB_HOST;
    
    console.log('DATABASE_URL exists:', hasDbUrl);
    console.log('DB_HOST exists:', hasDbHost);
    
    // Try to connect
    const pool = getPool();
    const result = await pool.query('SELECT NOW() as current_time, current_database() as db_name');
    
    return NextResponse.json({ 
      success: true, 
      serverTime: result.rows[0].current_time,
      database: result.rows[0].db_name,
      connectionMethod: hasDbUrl ? 'DATABASE_URL' : 'Individual credentials'
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      hasDbUrl: !!process.env.DATABASE_URL,
      hasDbHost: !!process.env.DB_HOST
    }, { status: 500 });
  }
}
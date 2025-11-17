// app/api/orders/route.ts (SIMPLER VERSION)
// Use this if the complex JSON aggregation doesn't work with your PostgreSQL version

import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export async function GET() {
  let client;
  
  try {
    client = await pool.connect();
    
  // Step 1: Get all orders with customer, guest, and address info
  const ordersQuery = `
    SELECT 
      o.order_id,
      o.order_date,
      o.total_price,
      o.order_status,
      o.reference,
      o.fk_guest_id,
      o.shipping_cost,
      o.shipping_method,
      o.tax,
      -- Guest info
      g.first_name,
      g.last_name,
      g.email as guest_email,
      g.phone_num as guest_phone,
      -- Address info
      a.street_line1,
      a.street_line2,
      a.city,
      a.state,
      a.postal_code,
      a.country
    FROM orders o
    LEFT JOIN guest g ON o.fk_guest_id = g.guest_id
    LEFT JOIN address a ON o.fk_ship_address_id = a.address_id
    ORDER BY o.order_date DESC;
  `;

  const ordersResult = await client.query(ordersQuery);    
    // Step 2: Get all order items
    const itemsQuery = `
      SELECT 
        fk_order_id,
        order_item_id,
        quantity,
        price,
        fk_product_id
      FROM order_item;
    `;
    
    const itemsResult = await client.query(itemsQuery);
    
    // Step 3: Create a map of order items by order_id
    const itemsByOrderId = new Map();
    itemsResult.rows.forEach(item => {
      const orderId = item.fk_order_id;
      if (!itemsByOrderId.has(orderId)) {
        itemsByOrderId.set(orderId, []);
      }
      itemsByOrderId.get(orderId).push({
        order_item_id: item.order_item_id,
        quantity: item.quantity,
        price: parseFloat(item.price),
        product_id: item.fk_product_id
      });
    });
    
    // Step 4: Combine orders with their items
    const orders = ordersResult.rows.map(row => ({
      order_id: row.order_id,
      order_date: row.order_date,
      total_price: parseFloat(row.total_price),
      order_status: row.order_status,
      reference: row.reference,
      guest: row.fk_guest_id ? {
        first_name: row.first_name,
        last_name: row.last_name,
        email: row.guest_email
      } : null,
      address: row.street_line1 ? {
        street_line1: row.street_line1,
        street_line2: row.street_line2,
        city: row.city,
        state: row.state,
        postal_code: row.postal_code,
        country: row.country
      } : null,
      order_item: itemsByOrderId.get(row.order_id) || []
    }));
    
    return NextResponse.json(orders);
    
  } catch (error) {
    console.error('Error fetching orders:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch orders',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  } finally {
    if (client) {
      client.release();
    }
  }
}
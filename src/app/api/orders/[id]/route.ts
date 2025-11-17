// app/api/orders/[id]/route.ts
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export async function GET( request: Request,  { params }: { params: Promise<{ id: string }> } ) {
    let client;
    try {
        const orderId = (await params).id;
        client = await pool.connect();
        
        // Get order with customer/guest info
        const orderQuery = `
        SELECT 
            o.order_id,
            o.order_date,
            o.total_price,
            o.order_status,
            o.reference,
            o.fk_guest_id,
            o.fk_ship_address_id,
            o.fk_bill_address_id,
            -- Guest info
            g.guest_id,
            g.email as email,
            g.first_name as first_name,
            g.last_name as last_name,
            -- Address info
            -- Shipping address
            sa.street_line1 as ship_street1,
            sa.street_line2 as ship_street2,
            sa.city as ship_city,
            sa.state as ship_state,
            sa.postal_code as ship_postal,
            sa.country as ship_country,
            -- Billing address
            ba.street_line1 as bill_street1,
            ba.street_line2 as bill_street2,
            ba.city as bill_city,
            ba.state as bill_state,
            ba.postal_code as bill_postal,
            ba.country as bill_country
        FROM orders o
        LEFT JOIN guest g ON o.fk_guest_id = g.guest_id
        LEFT JOIN address sa ON o.fk_ship_address_id = sa.address_id
        LEFT JOIN address ba ON o.fk_bill_address_id = ba.address_id
        WHERE o.order_id = $1;
        `;
        
        const orderResult = await client.query(orderQuery, [orderId]);
        
        if (orderResult.rows.length === 0) {
        return NextResponse.json(
            { error: 'Order not found' },
            { status: 404 }
        );
        }
    
        const orderRow = orderResult.rows[0];
        
        // Get order items with product info
        const itemsQuery = `
        SELECT 
            oi.order_item_id,
            oi.quantity,
            oi.price,
            oi.fk_product_id,
            p.product_id,
            p.product_name as product_name,
            p.description as product_description,
            p.prod_image_url as product_image
        FROM order_item oi
        JOIN product p ON oi.fk_product_id = p.product_id
        WHERE oi.fk_order_id = $1;
        `;
        
        const itemsResult = await client.query(itemsQuery, [orderId]);
        
        // Get invoice info
        const invoiceQuery = `
        SELECT 
            invoice_number,
            invoice_date,
            due_date,
            payment_status
        FROM invoice
        WHERE fk_order_id = $1;
        `;
        
        const invoiceResult = await client.query(invoiceQuery, [orderId]);
        
        // Get shipping info
        const shippingQuery = `
        SELECT 
            shipping_id,
            tracking_num,
            shipping_status,
            created_at,
            shipping_method
        FROM shipping
        WHERE fk_order_id = $1;
        `;
        
        const shippingResult = await client.query(shippingQuery, [orderId]);
        
        // Get payment info
        const paymentQuery = `
        SELECT 
            p.payment_id,
            p.payment_method,
            p.payment_date,
            p.amount_paid
        FROM payment p
        JOIN invoice i ON p.fk_invoice_id = i.invoice_id
        WHERE i.fk_order_id = $1;
        `;
        
        const paymentResult = await client.query(paymentQuery, [orderId]);
        
        // Build the response object
        const orderDetails = {
        order_id: orderRow.order_id,
        order_date: orderRow.order_date,
        total_price: parseFloat(orderRow.total_price),
        order_status: orderRow.order_status,
        reference: orderRow.reference,
        
        guest: orderRow.guest_id ? {
            guest_id: orderRow.guest_id,
            first_name: orderRow.first_name,
            last_name: orderRow.last_name,
            email: orderRow.email,      
        } : null,
        
      
        
        shipping_address: orderRow.fk_ship_address_id ? {
            street_line1: orderRow.ship_street1,
            street_line2: orderRow.ship_street2,
            city: orderRow.ship_city,
            state: orderRow.ship_state,
            postal_code: orderRow.ship_postal,
            country: orderRow.ship_country
        } : null,
        
        billing_address: orderRow.fk_bill_address_id ? {
            street_line1: orderRow.bill_street1,
            street_line2: orderRow.bill_street2,
            city: orderRow.bill_city,
            state: orderRow.bill_state,
            postal_code: orderRow.bill_postal,
            country: orderRow.bill_country
        } : null,
        
        order_items: itemsResult.rows.map(item => ({
            order_item_id: item.order_item_id,
            quantity: item.quantity,
            price: parseFloat(item.price),
            product: {
            product_id: item.product_id,
            name: item.product_name,
            description: item.product_description,
            image_url: item.product_image
            }
        })),
        
        invoice: invoiceResult.rows.length > 0 ? {
            invoice_number: invoiceResult.rows[0].invoice_number,
            invoice_date: invoiceResult.rows[0].invoice_date,
            due_date: invoiceResult.rows[0].due_date,
            payment_status: invoiceResult.rows[0].payment_status
        } : null,
        
        shipping: shippingResult.rows.length > 0 ? {
            shipping_id: shippingResult.rows[0].shipping_id,
            tracking_number: shippingResult.rows[0].tracking_number,
            shipping_status: shippingResult.rows[0].shipping_status,
            carrier: shippingResult.rows[0].carrier,
            estimated_delivery: shippingResult.rows[0].estimated_delivery
        } : null,
        
        payment: paymentResult.rows.length > 0 ? {
            payment_id: paymentResult.rows[0].payment_id,
            payment_method: paymentResult.rows[0].payment_method,
            payment_date: paymentResult.rows[0].payment_date,
            amount: parseFloat(paymentResult.rows[0].amount)
        } : null
        };
        console.log('Order Details:', orderDetails.guest);
        
        return NextResponse.json(orderDetails);
    
    } catch (error) {
        console.error('Error fetching order details:', error);
        
        return NextResponse.json(
        { 
            error: 'Failed to fetch order details',
            details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
        );
    } finally {
        if (client) {
        client.release();
        }
    }
    }

    // PATCH endpoint to update order status
    export async function PATCH(request: Request,  { params }: { params: Promise<{ id: string }> } ) {
    let client;
    
    try {
        const orderId = (await params).id;
        const body = await request.json();
        const { order_status } = body;
        
        if (!order_status) {
        return NextResponse.json(
            { error: 'order_status is required' },
            { status: 400 }
        );
        }
        
        client = await pool.connect();
        
        const updateQuery = `
        UPDATE orders 
        SET order_status = $1
        WHERE order_id = $2
        RETURNING order_id, order_status, reference;
        `;
        
        const result = await client.query(updateQuery, [order_status, orderId]);
        
        if (result.rows.length === 0) {
        return NextResponse.json(
            { error: 'Order not found' },
            { status: 404 }
        );
        }
        
        return NextResponse.json({
        success: true,
        order: result.rows[0]
        });
        
    } catch (error) {
        console.error('Error updating order:', error);
        
        return NextResponse.json(
        { 
            error: 'Failed to update order',
            details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
        );
    } finally {
        if (client) {
        client.release();
        }
    }
    }

    // DELETE endpoint to cancel/delete order
    export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> } ) {
        let client;
    
    try {
        const orderId = (await params).id;
        client = await pool.connect();
        
        // Start transaction
        await client.query('BEGIN');
        
        // Check if order exists
        const checkQuery = 'SELECT order_id FROM orders WHERE order_id = $1';
        const checkResult = await client.query(checkQuery, [orderId]);
        
        if (checkResult.rows.length === 0) {
        await client.query('ROLLBACK');
        return NextResponse.json(
            { error: 'Order not found' },
            { status: 404 }
        );
        }
        
        // Delete order (cascades to order_items, invoice, shipping due to FK constraints)
        const deleteQuery = 'DELETE FROM orders WHERE order_id = $1 RETURNING reference';
        const result = await client.query(deleteQuery, [orderId]);
        
        await client.query('COMMIT');
        
        return NextResponse.json({
        success: true,
        message: `Order ${result.rows[0].reference} deleted successfully`
        });
        
    } catch (error) {
        if (client) {
        await client.query('ROLLBACK');
        }
        console.error('Error deleting order:', error);
        
        return NextResponse.json(
        { 
            error: 'Failed to delete order',
            details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
        );
    } finally {
        if (client) {
        client.release();
        }
    }
}
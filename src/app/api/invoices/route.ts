import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// GET all invoices
export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        orders: {
          select: {
            order_id: true,
            order_date: true,
            customer: {
              select: {
                first_name: true,
                last_name: true,
                email: true,
              },
            },
            guest: {
              select: {
                email: true,
              },
            },
          },
        },
        payment: {
          select: {
            payment_id: true,
            payment_method: true,
            payment_date: true,
            amount_paid: true,
          },
        },
      },
      orderBy: {
        invoice_date: 'desc',
      },
    });

    return NextResponse.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    );
  }
}

// CREATE new invoice
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      fk_order_id, 
      invoice_number, 
      invoice_date, 
      total_price, 
      due_date, 
      payment_status 
    } = body;

    if (!invoice_number || !invoice_date || !due_date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newInvoice = await prisma.invoice.create({
      data: {
        fk_order_id: fk_order_id ? parseInt(fk_order_id) : null,
        invoice_number,
        invoice_date: new Date(invoice_date),
        total_price: total_price ? parseFloat(total_price) : null,
        due_date: new Date(due_date),
        payment_status: payment_status || 'pending',
      },
    });

    return NextResponse.json(newInvoice, { status: 201 });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    );
  }
}
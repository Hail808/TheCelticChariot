import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { requireAuth } from '../../../../../lib/auth';

// GET /api/shipping/order/:orderId - Get shipping by order ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderid: string }> }
) {
  try {
    await requireAuth();

    const { orderid } = await params;

    if (!(orderid)) {
      return NextResponse.json(
        { success: false, error: 'Invalid order ID' },
        { status: 400 }
      );
    }

    const shipping = await prisma.shipping.findUnique({
      where: { fk_order_id: orderid },
      include: {
        orders: {
          include: {
            guest: true,
          },
        },
        address: true,
      },
    });

    if (!shipping) {
      return NextResponse.json(
        { success: false, error: 'Shipping record not found for this order' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: shipping,
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import { CartService } from '../../../../../../../lib/cart-service';
import { requireAuth } from '../../../../../../../lib/auth';

// GET /api/cart/totals - get shopping cart totals
export async function GET() {
  try {
    const user = await requireAuth();
    const totals = await CartService.calculateTotals(user.id);

    return NextResponse.json({
      success: true,
      data: totals,
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
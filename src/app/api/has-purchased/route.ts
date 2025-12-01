import { NextResponse } from "next/server";
import { auth, getCurrentUser } from "@/lib/auth";         
import { prisma } from "@/lib/prisma";        

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = Number(searchParams.get("productId"));

    if (!productId) {
      return NextResponse.json(
        { hasPurchased: false, error: "Missing productId" },
        { status: 400 }
      );
    }

    // Get logged user session
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ hasPurchased: false });
    }

    // Get their linked guest record 
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { guest_id: true },
    });

    if (!dbUser || !dbUser.guest_id) {
      return NextResponse.json({ hasPurchased: false });
    }

    // Check if any order contains this product
    const order = await prisma.orders.findFirst({
      where: {
        fk_guest_id: dbUser.guest_id,
        order_item: {
          some: {
            fk_product_id: productId,
          },
        },
      },
    });

    return NextResponse.json({ hasPurchased: !!order });
  } catch (err) {
    console.error("hasPurchased error:", err);
    return NextResponse.json({ hasPurchased: false }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Math.max(parseInt(searchParams.get("page") || "1"), 1);
    const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "10"), 1), 50);
    const skip = (page - 1) * limit;
    
    const productId = searchParams.get("productId");

    // Fetch total count for pagination if needed
    const whereClause = productId
      ? { fk_product_id: Number(productId) }
      : {};

    const [reviews, totalCount] = await Promise.all([
      prisma.reviews.findMany({
        where: whereClause,
        orderBy: { review_date: "desc" },
        include: {
          customer: { select: { first_name: true, last_name: true } },
          product: { select: { product_name: true, prod_image_url: true } },
        },
        skip,
        take: limit,
      }),
      prisma.reviews.count({ where: whereClause }),
    ]);

    // If no reviews found, return empty data gracefully
    if (reviews.length === 0) {
      return NextResponse.json({
        reviews: [],
        totalCount,
        page,
        totalPages: Math.ceil(totalCount / limit),
        message: "No reviews found for this page or filter.",
      });
    }

    return NextResponse.json({
      reviews,
      totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error: any) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews", 
        details: error.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { review_text, rating, fk_customer_id, fk_product_id } = body;


    console.log("Received new review:", body);


    // Validate inputs
    if (!rating || !fk_product_id) {
      return NextResponse.json(
        { error: "Rating and product ID are required" },
        { status: 400 }
      );
    }


    const newReview = await prisma.reviews.create({
      data: {
        review_text,
        rating: parseInt(rating),
        fk_customer_id: fk_customer_id ? parseInt(fk_customer_id) : null,
        fk_product_id: parseInt(fk_product_id),
        review_date: new Date(), // auto timestamp
      },
    });


    console.log("✅ Review saved successfully:", newReview);


    return NextResponse.json({ success: true, newReview });
  } catch (error: any) {
    console.error("=== ERROR SAVING REVIEW ===");
    console.error("Error message:", error.message);
    return NextResponse.json(
      {
        error: "Failed to save review",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

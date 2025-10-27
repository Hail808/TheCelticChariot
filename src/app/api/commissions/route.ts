import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, details } = await req.json();

    // Simple validation
    if (!name || !email || !details) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Save to database
    const saved = await prisma.commission_requests.create({
      data: { name, email, details },
    });

    // Return success JSON
    return NextResponse.json({ success: true, saved });
  } catch (error: any) {
    console.error("Error saving commission request:", error);
    return NextResponse.json(
      { error: "Failed to save commission request" },
      { status: 500 }
    );
  }
}

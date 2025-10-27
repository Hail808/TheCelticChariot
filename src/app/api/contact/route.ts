import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { first_name, last_name, email, message } = await req.json();

    const saved = await prisma.contact_messages.create({
      data: { first_name, last_name, email, message },
    });

    return NextResponse.json({ success: true, saved });
  } catch (error: any) {
    console.error("Error saving contact message:", error);
    return NextResponse.json(
        { error: "Failed to save message" }, 
        { status: 500 }
    );
  }
}

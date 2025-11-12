import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactEmail } from "@/utils/sendEmail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { first_name, last_name, email, message } = body;

    if (!first_name || !last_name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const saved = await prisma.contact_messages.create({
      data: {
        first_name,
        last_name,
        email,
        message,
      },
    });

    await sendContactEmail({ 
        first_name, 
        last_name, 
        email_address: email,
        message_type: "contact", 
        message_body: message, 
    })

    return NextResponse.json({ success: true, saved });
  } catch (error: any) {
    console.error("Error saving contact message:", error);
    return NextResponse.json(
      { error: "Failed to save contact message", details: error.message },
      { status: 500 }
    );
  }
}

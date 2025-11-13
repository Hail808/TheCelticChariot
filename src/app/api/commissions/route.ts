import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactEmail } from "@/utils/sendEmail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { first_name, last_name, email_address, commission_message } = body;

    if (!first_name || !last_name || !email_address || !commission_message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const saved = await prisma.commissions.create({
      data: {
        first_name,
        last_name,
        email_address,
        commission_message,
      },
    });

    await sendContactEmail({ 
        first_name, 
        last_name, 
        email_address, 
        message_type: "commission",
        message_body: commission_message, 
    })

    return NextResponse.json({ success: true, saved });
  } catch (error: any) {
    console.error("Error saving commission request:", error);
    return NextResponse.json(
      { error: "Failed to save commission request", details: error.message },
      { status: 500 }
    );
  }
}

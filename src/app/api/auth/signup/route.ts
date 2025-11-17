import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../lib/auth';
import { prisma } from '../../../../lib/prisma';
import { CartService } from '@/lib/cart-service';



export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    if (!result.user) {
      return NextResponse.json(
        { success: false, error: 'Sign up failed' },
        { status: 400 }
      );
    }

    const userId = result.user.id;

    const existingGuest = await prisma.guest.findFirst({
      where: { email: email }
    });

    if (existingGuest) {
      await prisma.user.update({
        where: { id: userId },
        data: { guest_id: existingGuest.guest_id }
      });
      console.log(`Linked user ${userId} to existing guest ${existingGuest.guest_id}`);
    } else {
      const newGuest = await prisma.guest.create({
        data: { email: email, phone_num: '' }
      });
      await prisma.user.update({
        where: { id: userId },
        data: { guest_id: newGuest.guest_id }
      });
      console.log(`Created new guest ${newGuest.guest_id} for user ${userId}`);
    }

    const defaultOrg = await prisma.organization.findFirst({
      where: { name: "The Celtic Chariot" }
    });

    if (!defaultOrg) {
      return NextResponse.json(
        { success: false, error: 'Default organization not found' },
        { status: 500 }
      );
    }

    await prisma.organizationMember.create({
      data: {
        userId: userId,
        organizationId: defaultOrg.id,
        role: "CUSTOMER",
      },
    });
    const guestSessionId = request.cookies.get("guest_session_id")?.value;
    if (guestSessionId) {
      try {
        await CartService.mergeGuestCart(guestSessionId, userId); 
      } catch (err) {
        console.error('Failed to merge guest cart:', err);
      }
    }
    
    return NextResponse.json({
      success: true,
      user: result.user,
    });
  } catch (error: any) {
    if (error.message?.includes('already exists')) {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || 'Sign up failed' },
      { status: 500 }
    );
  }
}
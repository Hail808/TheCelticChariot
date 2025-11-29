"use server"

import { prisma } from './prisma';
import bcrypt from 'bcrypt';
import { getCurrentUser } from './actions/auth-actions';
import { auth } from './auth';
import { headers } from 'next/headers';



export async function updateUsername(name: string) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, error: 'Invalid session' };
    }

    // Update username
    await prisma.user.update({
      where: { id: user.id },
      data: { name: name }
    });

    return { success: true };
  } catch (error) {
    console.error('Update username error:', error);
    return { success: false, error: 'Failed to update username' };
  }
}

export async function updatePassword(currentPassword: string, newPassword: string) {
  try {

   const headersList = await headers();

    // Use Better Auth's changePassword API
    const result = await auth.api.changePassword({
      body: {
        currentPassword,
        newPassword,
        revokeOtherSessions: false, 
      },
      headers: headersList,
    });
    if (!result) {
      return { 
        success: false, 
        error: 'Failed to update password' 
      };
    }
    return { success: true };
  } catch (error) {
    console.error('Update password error:', error);
    return { success: false, error: 'Failed to update password' };
  }
}

export async function deleteAccount() {
  try {
    const userId = (await getCurrentUser()).id;
    await prisma.organizationMember.deleteMany({
      where: { userId: userId }
    });
    await prisma.user.delete({
      where: { id: userId }
    });

    return { success: true };
  } catch (error) {
    console.error('Delete account error:', error);
    return { success: false, error: 'Failed to delete account' };
  }
}


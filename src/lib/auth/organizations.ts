
import {getCurrentUser} from '../actions/auth-actions'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export async function getOrganizations(){
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        throw new Error("Not authenticated");
    }
    const organizations = await prisma.organization.findMany({
    where: {
      members: {
        some: {
          userId: currentUser.id,
        },
      },
    },
    include: {
      members: {
        where: {
          userId: currentUser.id,
        },
        select: {
          role: true,
        },
      },
    },
  });
    return organizations.map(org => ({
    id: org.id,
    name: org.name,
    role: org.members[0]?.role ?? "CUSTOMER",
  }));
}
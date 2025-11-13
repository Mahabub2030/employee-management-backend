import { UserRole } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { prisma } from "../shared/prisma";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await prisma.user.findUnique({
      where: {
        email: process.env.SUPER_ADMIN_EMAIL,
      },
    });

    if (isSuperAdminExist) {
      console.log("Super Admin Already Exists!");
      return;
    }

    console.log("Trying to create Super Admin...");

    const hashedPassword = await bcryptjs.hash(
      process.env.SUPER_ADMIN_PASSWORD as string,
      Number(process.env.BCRYPT_SALT_ROUND)
    );

    const superadmin = await prisma.user.create({
      data: {
        name: "Super Admin",
        email: process.env.SUPER_ADMIN_EMAIL as string,
        password: hashedPassword,
        role: UserRole.SUPER_ADMIN,
        needPasswordChange: true,
        authProviders: {
          create: [
            {
              provider: "credentials",
              providerId: process.env.SUPER_ADMIN_EMAIL as string,
            },
          ],
        },
      },
    });

    console.log("Super Admin Created Successfully:", superadmin);
  } catch (error) {
    console.error("Error creating Super Admin:", error);
  }
};

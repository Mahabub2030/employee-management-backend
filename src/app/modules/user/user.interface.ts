import { UserRole } from "@prisma/client";

export type createUserInput = {
  name: string;
  email: string;
  password: string;
};

export type CreateAdminPayload = {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  profilePhoto?: string;
};

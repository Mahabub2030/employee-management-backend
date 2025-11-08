import bcrypt from "bcrypt";
import { prisma } from "../../shared/prisma";
import { createUserInput } from "./user.interface";

const createUser = async (payload: createUserInput) => {
  const hashPassword = await bcrypt.hash(payload.password, 10);

  const result = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashPassword,
    },
  });
  return result;
};
export const UsersService = {
  createUser,
};

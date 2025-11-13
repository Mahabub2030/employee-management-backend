import { prisma } from "../../shared/prisma";

const login = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
      password: payload.password,
    },
  });
  return user;
};
export const AuthService = {
  login,
};

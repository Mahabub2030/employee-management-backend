import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { IOptions, paginationHelper } from "../../helpers/paginationHelper";
import { prisma } from "../../shared/prisma";
import { userSearchableFields } from "./user.constant";
import { createUserInput } from "./user.interface";

// normal User Create here
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
// admin Create here
const createAdmin = async (payload: { password: string; admin: any }) => {
  const hashPassword = await bcrypt.hash(payload.password, 10);

  const result = await prisma.user.create({
    data: {
      name: payload.admin.name,
      email: payload.admin.email,
      password: hashPassword,
      role: "ADMIN",
    },
  });
  return result;
};
// caretHrAdmin Create here
const createHrAdmin = async (payload: { password: string; hrAdmin: any }) => {
  const hashPassword = await bcrypt.hash(payload.password, 10);
  const result = await prisma.user.create({
    data: {
      name: payload.hrAdmin.name,
      email: payload.hrAdmin.email,
      password: hashPassword,
      role: "HR_ADMIN",
    },
  });
  return result;
};

const getAllUsers = async (params: any, options: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.UserWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.user.findMany({
    skip,
    take: limit,

    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  const total = await prisma.user.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const UsersService = {
  createUser,
  getAllUsers,
  createAdmin,
  createHrAdmin,
};

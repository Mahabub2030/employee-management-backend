import { Prisma } from "@prisma/client";
import { IOptions, paginationHelper } from "../../helpers/paginationHelper";
import { prisma } from "../../shared/prisma";
import { employeeSearchableFields } from "./employees.constant";

const createEmployees = async (payload: Prisma.EmployeeCreateInput) => {
  const result = await prisma.employee.create({
    data: {
      ...payload,
      isDeleted: false,
    },
  });
  return result;
};

const getAllEmployees = async (filters: any, options: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, specialties, ...filterData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: employeeSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }),
    });
  }

  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.EmployeeWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.employee.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "asc",
          },
  });
  const total = await prisma.employee.count({
    where: whereConditions,
  });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const getEmployeeById = async (id: string) => {
  const result = await prisma.employee.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });
  return result;
};

const softDelete = async (id: string) => {
  return await prisma.$transaction(async (transactionClient) => {
    const deteleEmployee = await transactionClient.employee.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    return deteleEmployee;
  });
};

const updateEmployees = async (payload: any) => {
  const { id, ...data } = payload;

  const employeeInfo = await prisma.employee.findFirstOrThrow({
    where: {
      email: payload.email,
      isDeleted: false,
    },
  });

  return await prisma.$transaction(async (tnx) => {
    await tnx.employee.update({
      where: {
        id: employeeInfo.id,
      },
      data: employeeInfo,
    });

    const result = await tnx.employee.findUnique({
      where: {
        id: employeeInfo.id,
      },
    });
    return result;
  });
};

export const EmployeesService = {
  createEmployees,
  getAllEmployees,
  getEmployeeById,
  softDelete,
  updateEmployees,
};

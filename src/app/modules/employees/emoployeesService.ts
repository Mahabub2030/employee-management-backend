import { Employee, Prisma } from "@prisma/client";
import { IOptions, paginationHelper } from "../../helpers/paginationHelper";
import { prisma } from "../../shared/prisma";
import { employeeSearchableFields } from "./employees.constant";

const createEmployees = async (payload: Employee) => {
  const employeeData = payload;

  if (!employeeData || Object.keys(employeeData).length === 0) {
    throw new Error("Employee data missing. Check JSON body and headers.");
  }

  const result = await prisma.employee.create({
    data: employeeData,
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

const updateEmployees = async (
  id: string,
  payload: Partial<Employee>
): Promise<Employee> => {
  const existingEmployee = await prisma.employee.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!existingEmployee) {
    throw new Error("Employee not found or has been deleted");
  }

  const result = await prisma.employee.update({
    where: { id },
    data: {
      ...payload,
      updatedAt: new Date(),
    },
  });
  return result;
};

export const EmployeesService = {
  createEmployees,
  getAllEmployees,
  getEmployeeById,
  softDelete,
  updateEmployees,
};

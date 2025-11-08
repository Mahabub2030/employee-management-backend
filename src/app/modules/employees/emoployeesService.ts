import { prisma } from "../../shared/prisma";

const createEmployees = async () => {
  const employeeData = await prisma.employees.created();
};

export const createEmployeesService = {
  createEmployees,
};

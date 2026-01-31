import { QueryBuilder } from "../../utils/QueryBuilder";
import { employeeSearchableFields } from "./employee.constant";
import { IEmployee } from "./employee.interface";
import { Employee } from "./employee.model";

const createEmployee = async (payload: IEmployee) => {
  const existingEmployees = await Employee.findOne({
    employeeId: payload.employeeId,
  });

  if (existingEmployees) {
    throw new Error("This employee already exists");
  }
  const employee = await Employee.create(payload);

  return employee;
};

const getAllEmployeeData = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Employee.find(), query);
  const emplyees = await queryBuilder
    .search(employeeSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();
  const [data, meta] = await Promise.all([
    emplyees,
    emplyees.build(),
    queryBuilder.getMeta(),
  ]);
  return {
    data,
    meta,
  };
};

const getSingaleEmployee = async (id: string) => {
  const employee = await Employee.findById(id);
  return {
    data: employee,
  };
};

const updatedEmployees = async (id: string, payload: Partial<IEmployee>) => {
  const existingEmployees = await Employee.findById(id);

  if (!existingEmployees) {
    throw new Error("employee Not found");
  }

  const updatedEmployees = await Employee.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedEmployees;
};
const deletedEmployees = async (id: string) => {
  await Employee.findByIdAndDelete(id);
  return null;
};

export const EmployeeService = {
  createEmployee,
  getAllEmployeeData,
  getSingaleEmployee,
  updatedEmployees,
  deletedEmployees,
};

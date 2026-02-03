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
  // console.log(payload);
  return employee;
};

const getAllEmployeeData = async () => {
  const employeeData = await Employee.find();

  return {
    data: employeeData,
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

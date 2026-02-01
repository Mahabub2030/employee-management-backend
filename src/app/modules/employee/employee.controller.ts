import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { IEmployee } from "./employee.interface";
import { EmployeeService } from "./employees.service";

const createEmployee = catchAsync(async (req: Request, res: Response) => {
  const result = await EmployeeService.createEmployee(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Employee created successfully",
    data: result,
  });
});
const getAllEmployeeData = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await EmployeeService.getAllEmployeeData(
    query as Record<string, string>,
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Employees retrieved successfully",
    data: result.data,
    // meta: result.meta,
  });
});

const getSingaleEmployee = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await EmployeeService.getSingaleEmployee(id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Employees retrieved successfully",
    data: result.data,
  });
});

const updatedEmployees = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload: IEmployee = {
    ...req.body,
    images: req.file?.path,
  };

  const result = await EmployeeService.updatedEmployees(id, payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Employees Updated successfully",
    data: result,
  });
});
const deletedEmployees = catchAsync(async (req: Request, res: Response) => {
  const result = await EmployeeService.deletedEmployees(req.params.id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Employees Deleted successfully",
    data: result,
  });
});

export const EmployeeControlers = {
  createEmployee,
  getAllEmployeeData,
  getSingaleEmployee,
  updatedEmployees,
  deletedEmployees,
};

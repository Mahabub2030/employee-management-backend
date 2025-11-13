import { Request, Response } from "express";
import pick from "../../helpers/pick";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { EmployeesService } from "./emoployeesService";
import { employeeFilterableFields } from "./employees.constant";

import httpStatus from "http-status";
import { IJWTPayload } from "../../types/common";

const createEmployees = catchAsync(async (req: Request, res: Response) => {
  //   const employes = req.employes;
  const result = await EmployeesService.createEmployees(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Employees created successfully!",
    data: result,
  });
});
const getAllEmployees = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, employeeFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await EmployeesService.getAllEmployees(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Employees recived successfully!",
    data: result,
  });
});

const getEmployeeById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EmployeesService.getEmployeeById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Employees retrieval successfully",
    data: result,
  });
});
const softDelete = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EmployeesService.softDelete(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Employees soft deleted successfully",
    data: result,
  });
});

const updateEmployees = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const user = req.user;
    const result = await EmployeesService.updateEmployees(user as IJWTPayload);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: " Employee updated successfully",
      data: result,
    });
  }
);

export const EmployeesControlers = {
  createEmployees,
  getAllEmployees,
  getEmployeeById,
  updateEmployees,
  softDelete,
};

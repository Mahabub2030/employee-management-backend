import { Request, Response } from "express";
import pick from "../../helpers/pick";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { EmployeesService } from "./emoployeesService";
import { employeeFilterableFields } from "./employees.constant";

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
    statusCode: 201,
    success: true,
    message: "Employees recived successfully!",
    data: result,
  });
});

export const EmployeesControlers = {
  createEmployees,
  getAllEmployees,
};

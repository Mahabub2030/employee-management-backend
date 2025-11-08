import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { createEmployeesService } from "./emoployeesService";

const createEmployees = catchAsync(async (req: Request, res: Response) => {
  //   const employes = req.employes;
  const result = await createEmployeesService(req.body);
  console.log(result);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Employees created successfully!",
    data: result,
  });
});

export const EmployeesControlers = {
  createEmployees,
};

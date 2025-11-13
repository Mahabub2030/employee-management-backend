import { Request, Response } from "express";
import pick from "../../helpers/pick";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { userFilterableFields } from "./user.constant";
import { UsersService } from "./user.service";

const createUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UsersService.createUser(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User created successfully!",
    data: result,
  });
});
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UsersService.createAdmin(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Admin created successfully!",
    data: result,
  });
});

const createHrAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UsersService.createHrAdmin(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "HR Admin created successfully!",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]); // pagination and sorting

  const result = await UsersService.getAllUsers(filters, options);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User retrive successfully!",
    meta: result.meta,
    data: result.data,
  });
});

export const UserControler = {
  createUsers,
  getAllUsers,
  createAdmin,
  createHrAdmin,
};

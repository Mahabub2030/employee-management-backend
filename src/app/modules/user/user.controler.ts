import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
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

export const UserControler = {
  createUsers,
};

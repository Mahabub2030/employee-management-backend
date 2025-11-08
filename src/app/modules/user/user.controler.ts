import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";

const createUsers = catchAsync(async (req: Request, res: Response) => {
  console.log("users", req.body);
});

export const UserControler = {
  createUsers,
};

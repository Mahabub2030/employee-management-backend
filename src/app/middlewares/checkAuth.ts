import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { IsActive } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { verifyToken } from "../utils/jwt";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const cookieToken = req.cookies?.accessToken;

      let rawToken = authHeader || cookieToken;

      // Debugging logs - inspect these in your terminal
      // console.log("RECEIVED AUTHORIZATION HEADER:", authHeader);
      // console.log("RECEIVED COOKIE TOKEN:", cookieToken);

      if (!rawToken) {
        throw new AppError(403, "No Token Received");
      }

      // 1. Strip 'Bearer ' if present
      if (rawToken.startsWith("Bearer ")) {
        rawToken = rawToken.split(" ")[1];
      }

      // 2. Clean whitespace, quotes, or accidental stringification
      let cleanToken = rawToken.trim();
      if (cleanToken.startsWith('"') && cleanToken.endsWith('"')) {
        cleanToken = cleanToken.slice(1, -1);
      }

      // 3. Reject invalid or non-JWT string representations
      if (
        !cleanToken ||
        cleanToken === "undefined" ||
        cleanToken === "null" ||
        cleanToken === "[object Object]"
      ) {
        throw new AppError(403, "Invalid Token Received");
      }

      // console.log("SANITIZED TOKEN TO VERIFY:", cleanToken);

      const verifiedToken = verifyToken(
        cleanToken,
        envVars.JWT_ACCESS_SECRET,
      ) as JwtPayload;

      const isUserExist = await User.findOne({ email: verifiedToken.email });

      if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
      }
      if (!isUserExist.isVerified) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is not verified");
      }
      if (
        isUserExist.isActive === IsActive.BLOCKED ||
        isUserExist.isActive === IsActive.INACTIVE
      ) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `User is ${isUserExist.isActive}`,
        );
      }
      if (isUserExist.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(403, "You are not permitted to view this route!!!");
      }
      req.user = verifiedToken;
      next();
    } catch (error) {
      // console.log("jwt error", error);
      next(error);
    }
  };

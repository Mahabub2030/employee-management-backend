import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { IsActive, IUser } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { generateToken, verifyToken } from "./jwt";

export const createUserTokens = (user: Partial<IUser>) => {
  const tokenPayload = {
    email: user.email,
    role: user.role,
    id: user._id,
  };

  const accessToken = generateToken(
    tokenPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  const refreshToken = generateToken(
    tokenPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES
  );
  return {
    accessToken,
    refreshToken,
  };
};

export const createNewAccessTokenUseRefreshToken = async (
  refreshToken: string
) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET as string
  ) as JwtPayload;

  const isExistUser = await User.findOne({ email: verifiedRefreshToken.email });
  if (!isExistUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist");
  }

  if (
    isExistUser.isActive === IsActive.BLOCKED ||
    isExistUser.isActive === IsActive.INACTIVE
  ) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Your account is blocked or inactive"
    );
  }

  if (isExistUser.isDeleted === true) {
    throw new AppError(httpStatus.FORBIDDEN, "Your account is deleted");
  }

  const tokenPayload = {
    email: isExistUser.email,
    role: isExistUser.role,
    id: isExistUser._id,
  };

  const accessToken = generateToken(
    tokenPayload,
    envVars.JWT_ACCESS_SECRET as string,
    envVars.JWT_ACCESS_EXPIRES as string
  );

  return {
    accessToken,
  };
};

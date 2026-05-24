import bcrypt from "bcryptjs";
import httpStatus from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { sendMail } from "../../utils/sendEmail";
import { createNewAccessTokenUseRefreshToken } from "../../utils/userToken";
import { IAuthProvider, IsActive } from "../user/user.interface";
import { User } from "../user/user.model";
const changePassword = async (
  decodedToken: JwtPayload,
  newPassword: string,
  oldPassword: string
) => {
  const isExistUser = await User.findById(decodedToken.id);
  if (!isExistUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "ID does not exist");
  }
  if (oldPassword === newPassword) {
    throw new AppError(401, "Your password is same");
  }
  const isOldPasswordMatch = await bcrypt.compare(
    oldPassword,
    isExistUser.password as string
  );
  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Old password is incorrect");
  }
  isExistUser.password = await bcrypt.hash(
    newPassword,
    Number(envVars.BCRYPT_SALT_ROUND)
  );
  isExistUser.save();
};

const createNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenUseRefreshToken(
    refreshToken
  );

  return {
    accessToken: newAccessToken.accessToken,
  };
};

const setPassword = async (decodedToken: JwtPayload, password: string) => {
  const user = await User.findById(decodedToken.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }

  if (
    user.password &&
    user.auths.some((providerObj) => providerObj.provider === "google")
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have already set your password. Now you can change the password from your profile"
    );
  }

  if (
    user.password &&
    user.auths.some((providerObj) => providerObj.provider === "credentials")
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, "You are not google login user");
  }

  const hashPassword = await bcrypt.hash(
    password,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: user.email,
  };
  user.auths = [...user.auths, authProvider];
  user.password = hashPassword;
  await user.save();
};

const resetPassword = async (
  decodedToken: JwtPayload,
  newPassword: string,
  id: string
) => {
  if (id !== decodedToken.id) {
    throw new AppError(401, "You can not reset your password");
  }

  const isExistUser = await User.findById(decodedToken.id);
  if (!isExistUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "ID does not exist");
  }

  isExistUser.password = await bcrypt.hash(
    newPassword,
    Number(envVars.BCRYPT_SALT_ROUND)
  );
  await isExistUser.save();
};

const forgotPassword = async (email: string) => {
  const isExistUser = await User.findOne({ email: email });
  if (!isExistUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist");
  }
  if (isExistUser.isVerified === !true) {
    throw new AppError(httpStatus.FORBIDDEN, "Your account is not verified");
  }

  if (
    isExistUser.isActive === IsActive.BLOCKED ||
    isExistUser.isActive === IsActive.INACTIVE
  ) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      `Your account is ${isExistUser.isActive}`
    );
  }
  if (isExistUser.isDeleted === true) {
    throw new AppError(httpStatus.FORBIDDEN, "Your account is deleted");
  }
  const payload = {
    email: isExistUser.email,
    role: isExistUser.role,
    id: isExistUser._id,
  };
  const resetToken = jwt.sign(payload, envVars.JWT_ACCESS_SECRET, {
    expiresIn: "10m",
  });

  const resetUILink = `https://neopay-wallet.vercel.app/reset-password?id=${isExistUser._id}&token=${resetToken}`;

  sendMail({
    to: isExistUser.email,
    subject: "Password Reset",
    templateName: "forgetPassword",
    templateData: {
      name: isExistUser.name,
      resetUILink,
    },
  });
};

export const AuthService = {
  changePassword,
  createNewAccessToken,
  setPassword,
  resetPassword,
  forgotPassword,
};

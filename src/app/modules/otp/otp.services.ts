import crypto from "crypto";
import httpStatus from "http-status";
import { redisClient } from "../../config/redis.config";
import AppError from "../../errorHelpers/AppError";
import { sendMail } from "../../utils/sendEmail";
import { User } from "../user/user.model";

const OTP_EXPIRATION = 2 * 60;

const generateOtp = (length = 6) => {
  const opt = crypto.randomInt(10 ** (length - 1), 10 ** length).toString();
  return opt;
};
const sendOTP = async (email: string) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  if (user.isVerified) {
    throw new AppError(401, "Your are already verified");
  }
  const opt = generateOtp();
  const redisKey = `opt:${email}`;
  await redisClient.set(redisKey, opt, {
    expiration: {
      type: "EX",
      value: OTP_EXPIRATION,
    },
  });
  await sendMail({
    to: email,
    subject: "Your OTP Code",
    templateName: "otp",
    templateData: {
      name: user.name,
      otp: opt,
    },
  });
};

export const OTPService = {
  sendOTP,
};

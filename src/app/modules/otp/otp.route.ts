import express from "express";
import { OTPController } from "./otp.controller";

const otpRoute = express.Router();
otpRoute.post("/send", OTPController.sendOTP);

export default otpRoute;

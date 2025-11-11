import express from "express";

import { UserControler } from "./user.controler";

const router = express.Router();

router.post(
  "/create-user",
  // fileUploader.uploadTocloudinary,
  UserControler.createUsers
);
router.get(
  "/",
  // fileUploader.uploadTocloudinary,
  UserControler.getAllUsers
);

export const userRoutes = router;

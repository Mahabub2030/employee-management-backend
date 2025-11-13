import express from "express";

import { UserControler } from "./user.controler";

const router = express.Router();

router.post(
  "/create-user",
  // fileUploader.uploadTocloudinary,
  UserControler.createUsers
);

router.post("/create-admin", UserControler.createAdmin);
router.post("/create-hr-admin", UserControler.createHrAdmin);
router.get(
  "/",
  // fileUploader.uploadTocloudinary,
  UserControler.getAllUsers
);

export const userRoutes = router;

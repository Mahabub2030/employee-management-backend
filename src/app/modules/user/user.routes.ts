import express from "express";

import { fileUploader } from "../../helpers/fileUploader";
import { UserControler } from "./user.controler";

const router = express.Router();

router.post(
  "/create-user",
  fileUploader.uploadTocloudinary,
  UserControler.createUsers
);

export const userRoutes = router;

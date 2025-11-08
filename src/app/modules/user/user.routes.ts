import express from "express";
import { UserControler } from "./user.controler";

const router = express.Router();

router.post("/create-user", UserControler.createUsers);

export const userRoutes = router;

import express from "express";
import { EmployeesControlers } from "./employeesControler";

const router = express.Router();

router.post("/", EmployeesControlers.createEmployees);

export const EmployeesRoutes = router;

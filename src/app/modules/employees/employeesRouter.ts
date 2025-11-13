import express from "express";
import { EmployeesControlers } from "./employeesControler";

const router = express.Router();

router.post("/", EmployeesControlers.createEmployees);
router.get("/", EmployeesControlers.getAllEmployees);

export const EmployeesRoutes = router;

import express from "express";
import { EmployeesControlers } from "./employeesControler";

const router = express.Router();

router.post("/", EmployeesControlers.createEmployees);
router.get("/", EmployeesControlers.getAllEmployees);

router.get("/:id", EmployeesControlers.getEmployeeById);
router.delete("/soft/:id", EmployeesControlers.softDelete);

export const EmployeesRoutes = router;

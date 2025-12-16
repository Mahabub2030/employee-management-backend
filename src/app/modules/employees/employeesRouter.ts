import express from "express";
import { EmployeesControlers } from "./employeesControler";

const router = express.Router();
router.post("/", EmployeesControlers.createEmployees);

console.log("this");
router.get("/", EmployeesControlers.getAllEmployees);

router.get("/:id", EmployeesControlers.getEmployeeById);

router.patch("/:id", EmployeesControlers.updateEmployees);
router.delete("/soft/:id", EmployeesControlers.softDelete);

export const EmployeesRoutes = router;

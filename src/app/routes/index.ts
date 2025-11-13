import express from "express";
import { AdminRoutes } from "../modules/admin/admin.routes";
import { EmployeesRoutes } from "../modules/employees/employeesRouter";
import { userRoutes } from "../modules/user/user.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/employees",
    route: EmployeesRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

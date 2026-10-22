import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { EmployeeControlers } from "./employee.controller";

const router = Router();

router.post(
  "/create",
  multerUpload.array("images", 5),
  EmployeeControlers.createEmployee,
);
router.get(
  "/all-employees",
  // validateRequest(createUserZodSchema),
  EmployeeControlers.getAllEmployeeData,
);
router.get(
  "/all-Employee",
  // validateRequest(createUserZodSchema),
  EmployeeControlers.getAllEmployeeData,
);
router.get(
  "/all-emplyees",
  // validateRequest(createUserZodSchema),
  EmployeeControlers.getAllEmployeeData,
);
router.get(
  "/:id",
  // validateRequest(createUserZodSchema),
  EmployeeControlers.getSingaleEmployee,
);
router.patch(
  "/:id",
  multerUpload.array("images", 5),
  EmployeeControlers.updatedEmployees,
);
router.delete("/:id", EmployeeControlers.deletedEmployees);

// /api/v1/user/:id
export const EmployeeRoutes = router;

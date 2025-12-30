import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { EmployeeControlers } from "./employee.controller";

const router = Router();

router.post(
  "/create",
  // validateRequest(createUserZodSchema),
  EmployeeControlers.createEmployee
);
router.get(
  "/all-Employee",
  // validateRequest(createUserZodSchema),
  EmployeeControlers.getAllEmployeeData
);
router.get(
  "/:id",
  // validateRequest(createUserZodSchema),
  EmployeeControlers.getSingaleEmployee
);
router.patch(
  "/:id",
  multerUpload.single("file"),
  EmployeeControlers.updatedEmployees
);
router.delete("/:id", EmployeeControlers.deletedEmployees);

// /api/v1/user/:id
export const EmployeeRoutes = router;

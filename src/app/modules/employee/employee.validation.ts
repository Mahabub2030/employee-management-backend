import { z } from "zod";
import { EMPLOYEE_STATUS } from "./employee.interface";

export const createEmployeeValidationSchema = z.object({
  body: z.object({
    // Required fields from your spreadsheet dataset
    name: z.string().min(1, "Name is required"),

    // Accepts both numeric IDs and string representations safely
    employeeId: z.union([
      z.string().min(1, "Employee ID is required"),
      z.number(),
    ]),

    idNumber: z.string().min(1, "Iqama / ID Number is required"),
    group: z.string().min(1, "Group designation is required"),
    jobTitle: z.string().min(1, "Job title is required"),
    companyName: z.string().min(1, "Company name is required"),

    // Coerces string ISO dates coming from your JSON into true Date instances
    joiningDate: z.coerce.date({
      required_error: "Joining date is required",
      invalid_type_error: "Invalid joining date format",
    }),

    // Validates against your existing EMPLOYEE_STATUS Enum
    status: z.nativeEnum(EMPLOYEE_STATUS).default(EMPLOYEE_STATUS.ACTIVE),

    // Optional or secondary spreadsheet data fields
    dacoId: z.string().optional().default(""),
    remark: z.string().optional().default(""),

    // Kept from your original schema but made optional/flexible
    SAPNumber: z.string().optional(),
    gender: z.enum(["male", "female"]).optional(),
    email: z.union([z.string().email(), z.string().length(0)]).optional(), // Allows empty strings or valid emails
    phoneNumber: z.union([z.string(), z.number()]).optional(),
    description: z.string().optional(),
    workLocation: z.string().optional().default(""),
    images: z.array(z.string()).optional().default([]),
  }),
});

export const updateEmployeeValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    employeeId: z.union([z.string(), z.number()]).optional(),
    idNumber: z.string().optional(),
    group: z.string().optional(),
    jobTitle: z.string().optional(),
    companyName: z.string().optional(),
    joiningDate: z.coerce.date().optional(),
    status: z.nativeEnum(EMPLOYEE_STATUS).optional(),
    dacoId: z.string().optional(),
    remark: z.string().optional(),
    SAPNumber: z.string().optional(),
    gender: z.enum(["male", "female"]).optional(),
    email: z.union([z.string().email(), z.string().length(0)]).optional(),
    phoneNumber: z.union([z.string(), z.number()]).optional(),
    description: z.string().optional(),
    workLocation: z.string().optional(),
    images: z.array(z.string()).optional(),
  }),
});

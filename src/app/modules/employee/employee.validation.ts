import { z } from "zod";

export const createEmployee = z.object({
  name: z.string().min(1, "Name is required"),

  employeeId: z.number().int().positive("Employee ID must be positive"),

  SAPNumber: z.number().int().positive("ID Number must be positive"),

  gender: z.enum(["male", "female"]),

  email: z.string().email("Invalid email address"),

  phoneNumber: z.number().int().positive("Phone number must be valid"),

  jobTitle: z.string().min(1, "Job title is required"),

  description: z.string().optional(),

  workLocation: z.string().optional(),

  joiningDate: z.string().optional(), // or z.coerce.date()
});

// export const updateEmployeeZodSchema = z.object({
//   name: z.string().min(1, "Name is required").optional(),

//   jobTitle: z.string().min(1, "Job title is required").optional(),

//   description: z.string().optional(),

//   workLocation: z.string().optional(),

//   joiningDate: z.string().optional(), // or z.coerce.date()
// });

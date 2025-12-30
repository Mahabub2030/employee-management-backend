import { z } from "zod";

export const createEmployee = z.object({
  Jobtitle: z.string(),
  Name: z.string(),
  description: z.string().optional(),
  Joblocation: z.string().optional(),
  JoiningtDate: z.string().optional().optional(),
});

export const updateEmployeeZodSchema = z.object({
  Jobtitle: z.string(),
  Name: z.string(),

  description: z.string().optional(),
  Joblocation: z.string().optional(),
  JoiningtDate: z.string().optional().optional(),
});

export const createTourTypeZodSchema = z.object({
  name: z.string(),
});

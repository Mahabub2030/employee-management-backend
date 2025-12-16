import { z } from "zod";

export const createEmployeeValidationSchema = z.object({
  employees: z.object({
    name: z.string({
      error: "Name is required!",
    }),

    idNumber: z.string({
      error: "ID Number is required!",
    }),

    group: z.string({
      error: "Group is required!",
    }),

    jobTitle: z.string({
      error: "Job Title is required!",
    }),

    educationQualification: z.string({
      error: "Education Qualification is required!",
    }),

    joiningDate: z.string({
      error: "Joining Date is required!",
    }),

    email: z.string({
      error: "Email is required!",
    }),

    phoneNumber: z.string({
      error: "Phone Number is required!",
    }),

    gender: z.string({
      error: "Gender is required!",
    }),

    status: z.string({
      error: "Status is required!",
    }),

    profilePhoto: z.string().optional(),

    nationality: z.string({
      error: "Nationality is required!",
    }),
  }),
});

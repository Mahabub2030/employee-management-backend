import z from "zod";

const createUserValidationSchema = z.object({
  password: z.string(),
  user: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required"),
  }),
});

const createAdminValidationSchema = z.object({
  password: z.string({
    error: "Password is required",
  }),
  admin: z.object({
    name: z.string({
      error: "Name is required!",
    }),
    email: z.string({
      error: "Email is required!",
    }),
    idNumber: z.string({
      error: "id Number is required!",
    }),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  createAdminValidationSchema,
};

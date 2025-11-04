// Creating the schema using zod
import { z } from "zod";
// TODO: Add the regex for normal users
export const loginSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." })
    .transform((email) => email.toLocaleLowerCase().trim()),
  password: z
    .string()
    .min(1, { message: "Password is required." })
    .min(3, { message: "Password must be at least 3 character." })
    .max(50, { message: "Password must have less than 50 characters." }),
  // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
  //   message:
  //     "Password must contain at least one lowercase letter, one uppercase letter, and one number",
  // }),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required." })
      .min(2, { message: "Name must have at least 2 character" })
      .max(50, { message: "Name must be less than 50 characters" }),
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email({ message: "Please enter a valid email address." })
      .transform((email) => email.toLocaleLowerCase().trim()),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(1, { message: "Password is required" })
      .min(2, { message: "Password must be at least 2 character" })
      .max(50, { message: "Password must be less than 50 characters" }),
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    //   {
    //     message:
    //       "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    //   }
    // ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password don't match",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

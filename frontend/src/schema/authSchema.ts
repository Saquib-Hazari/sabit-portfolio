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

export const projectSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title filed is required" })
    .max(50, { message: "Title should be less than 50 character" })
    .trim(),
  subtitle: z
    .string()
    .min(3, { message: "Subtitle field is Required." })
    .max(100, { message: "Subtitle should be less than 100 character" })
    .trim(),
  description: z
    .string()
    .min(5, { message: "Description field is required" })
    .trim(),
  link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  imageUrl: z.instanceof(File).optional(),
  techStack: z.string(),
});

export const projectApiSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  link: z.string().optional(),
  imageUrl: z.string().optional(),
  techStack: z.string(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type ProjectApiFormData = z.infer<typeof projectApiSchema>;

import { z } from "zod";

const passwordsMatch = ({ password, confirmPassword }: { password: string; confirmPassword: string }) => password === confirmPassword;

export const securitySchema = z
  .object({
    password: z
      .string()
      .min(8, "Use at least 8 characters.")
      .regex(/[A-Z]/, "Add an uppercase letter.")
      .regex(/[a-z]/, "Add a lowercase letter.")
      .regex(/[0-9]/, "Add a number.")
      .regex(/[^A-Za-z0-9\s]/, "Add a special character."),
    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .refine(passwordsMatch, { message: "Passwords do not match.", path: ["confirmPassword"] });

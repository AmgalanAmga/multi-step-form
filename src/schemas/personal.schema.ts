import { z } from "zod";

const name = z
  .string()
  .trim()
  .min(2, "Enter at least 2 letters.")
  .regex(/^\p{L}+$/u, "Use letters only.");

export const personalSchema = z.object({
  firstName: name,
  lastName: name,
  email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email address.")),
});

export type PersonalValues = z.infer<typeof personalSchema>;

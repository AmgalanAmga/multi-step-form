import { z } from "zod";
import { MAX_IMAGE_BYTES } from "@/constants";
import { startOfToday, subYears } from "date-fns";

const MIN_AGE = 13;

export const latestBirthDate = () => subYears(startOfToday(), MIN_AGE);

export const dateOfBirthSchema = z.iso.date("Choose a valid date.");

export const imageSchema = z.file("Choose a profile image.").max(MAX_IMAGE_BYTES, "Image must be 5 MB or smaller.");

const name = z
  .string()
  .trim()
  .min(2, "Enter at least 2 letters.")
  .regex(/^\p{L}+$/u, "Use letters only.");

export const personalSchema = z.object({
  lastName: name,
  firstName: name,
  email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email address.")),
});

const registrationFields = {
  ...personalSchema.shape,
  phoneNumber: z.string().regex(/^\d{8}$/, "Enter exactly 8 digits."),
  dateOfBirth: dateOfBirthSchema,
};

const passwordsMatch = ({ password, confirmPassword }: { password: string; confirmPassword: string }) => password === confirmPassword;

export const registrationFormSchema = z
  .object({
    ...registrationFields,
    profileImage: imageSchema,
    password: z
      .string()
      .min(8, "Use at least 8 characters.")
      .regex(/[A-Z]/, "Add an uppercase letter.")
      .regex(/[a-z]/, "Add a lowercase letter.")
      .regex(/[0-9]/, "Add a number.")
      .regex(/[^A-Za-z0-9\s]/, "Add a special character."),
    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .refine(passwordsMatch, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const registerSchema = z.object({
  ...registrationFields,
  profileImage: z.templateLiteral(["/api/profile-images/", z.uuid()]),
});

export type RegisterValues = z.infer<typeof registrationFormSchema>;
export type RegistrationPayload = z.infer<typeof registerSchema>;

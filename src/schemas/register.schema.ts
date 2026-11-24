import { z } from "zod";
import { MAX_IMAGE_BYTES } from "@/constants";
import { startOfToday, subYears } from "date-fns";

const MIN_AGE = 13;

export const latestBirthDate = () => subYears(startOfToday(), MIN_AGE);

const name = z
  .string()
  .trim()
  .min(2, "Enter at least 2 letters.")
  .regex(/^\p{L}+$/u, "Use letters only.");

export const profileImageUrlSchema = z.templateLiteral(["/api/profile-images/", z.uuid()]);

const formFields = z.object({
  firstName: name,
  lastName: name,
  email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email address.")),
  phoneNumber: z.string().regex(/^\d{8}$/, "Enter exactly 8 digits."),
  dateOfBirth: z.iso.date("Choose a valid date."),
  profileImage: z.file("Choose a profile image.").max(MAX_IMAGE_BYTES, "Image must be 5 MB or smaller."),
  password: z
    .string()
    .min(8, "Use at least 8 characters.")
    .regex(/[A-Z]/, "Add an uppercase letter.")
    .regex(/[a-z]/, "Add a lowercase letter.")
    .regex(/[0-9]/, "Add a number.")
    .regex(/[^A-Za-z0-9\s]/, "Add a special character."),
  confirmPassword: z.string().min(1, "Confirm your password."),
});

export type RegisterValues = z.infer<typeof formFields>;

const passwordsMatch = (values: RegisterValues) => values?.password === values?.confirmPassword;

export const registrationFormSchema = formFields.refine(passwordsMatch, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
  when: () => true,
});

export type RegistrationPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  profileImage: z.infer<typeof profileImageUrlSchema>;
};

import { z } from "zod";
import { IMAGE_TYPES, MAX_IMAGE_BYTES, MIN_AGE } from "@/lib/constants";

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

const securityFields = z.object({
  password: z
    .string()
    .min(8, "Use at least 8 characters.")
    .regex(/[A-Z]/, "Add an uppercase letter.")
    .regex(/[a-z]/, "Add a lowercase letter.")
    .regex(/[0-9]/, "Add a number.")
    .regex(/[^A-Za-z0-9\s]/, "Add a special character."),
  confirmPassword: z.string().min(1, "Confirm your password."),
});
type PasswordConfirmationType = { password: string; confirmPassword: string };

const passwordsMatch = (values: PasswordConfirmationType) => values.password === values.confirmPassword;

const matchError = {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
};

export const securitySchema = securityFields.refine(passwordsMatch, matchError);

export const latestBirthDate = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const month = date.getMonth();
  date.setFullYear(date.getFullYear() - MIN_AGE);
  if (date.getMonth() !== month) date.setDate(0);

  return date;
};

const isValidDate = (value: string) => {
  const date = new Date(`${value}T00:00:00`);
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(date.getTime()) &&
    date.getFullYear() === Number(value.slice(0, 4)) &&
    date.getMonth() + 1 === Number(value.slice(5, 7)) &&
    date.getDate() === Number(value.slice(8, 10))
  );
};

const isNotFutureDate = (value: string) => {
  return new Date(`${value}T00:00:00`) <= new Date();
};

const meetsMinimumAge = (value: string) => {
  return new Date(`${value}T00:00:00`) <= latestBirthDate();
};

export const dateOfBirthSchema = z
  .string()
  .min(1, "Select your date of birth.")
  .refine(isValidDate, "Choose a valid date.")
  .refine(isNotFutureDate, "Date cannot be in the future.")
  .refine(meetsMinimumAge, "You must be at least 13 years old.");

const isFile = (value: unknown) => {
  return typeof File !== "undefined" && value instanceof File;
};

const isWithinSizeLimit = (file: File) => {
  return !file || file.size <= MAX_IMAGE_BYTES;
};

const isSupportedImage = (file: File) => {
  const matchesImageType = (type: "image/jpeg" | "image/png" | "image/webp") => {
    return type === file.type;
  };

  return !file || IMAGE_TYPES.some(matchesImageType);
};

export const imageSchema = z
  .custom<File>(isFile, "Choose a profile image.")
  .refine(isWithinSizeLimit, "Image must be 5 MB or smaller.")
  .refine(isSupportedImage, "Choose a JPEG, PNG, or WebP image.");
export const profileSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\+?[1-9]\d{7,14}$/, "Enter an international phone number, e.g. +97699112233."),
  dateOfBirth: dateOfBirthSchema,
  profileImage: imageSchema,
});
// Validate security independently so a missing profile file cannot skip password matching.
export const registerSchema = personalSchema.extend(profileSchema.shape).and(securitySchema);
export type PersonalValues = z.infer<typeof personalSchema>;
export type SecurityValues = z.infer<typeof securitySchema>;
export type ProfileValues = z.infer<typeof profileSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export const successSchema = personalSchema.extend({
  phoneNumber: profileSchema.shape.phoneNumber,
  dateOfBirth: dateOfBirthSchema,
  profileImage: z.templateLiteral(["/api/profile-images/", z.uuid()]),
});
export const draftSchema = z.object({
  step: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  values: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    dateOfBirth: z.union([z.literal(""), dateOfBirthSchema]),
  }),
});

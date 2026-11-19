import type { FieldPath } from "react-hook-form";
import type { RegisterValues } from "@/lib/validations/register.schema";

export const STORAGE_KEYS = {
  draft: "orbit:registration:v1",
  success: "orbit:registration:success:v1",
} as const;

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

export const MIN_AGE = 13;

export const STEPS = ["Personal info", "Security", "Profile"] as const;

export const UPLOAD_TIMEOUT_MS = 60_000;

export const defaults = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  dateOfBirth: "",
};

export const fields: Record<FormStep, FieldPath<RegisterValues>[]> = {
  1: ["firstName", "lastName", "email"],
  2: ["password", "confirmPassword"],
  3: ["phoneNumber", "dateOfBirth", "profileImage"],
};

export const copy = {
  1: {
    title: "Let’s start with you.",
    description: "A few details to make this space your own.",
  },
  2: {
    title: "Keep it just yours.",
    description: "A strong password for everything that’s ahead.",
  },
  3: {
    title: "Make yourself at home.",
    description: "The finishing touches. A little personality goes a long way.",
  },
};

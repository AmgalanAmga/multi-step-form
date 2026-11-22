import type { RegisterValues } from "@/schemas";
import type { FieldPath } from "react-hook-form";

export const STEPS = ["Personal info", "Security", "Profile"] as const;

export const fields: Record<FormStep, FieldPath<RegisterValues>[]> = {
  0: ["firstName", "lastName", "email"],
  1: ["password", "confirmPassword"],
  2: ["phoneNumber", "dateOfBirth", "profileImage"],
};

export const copy = {
  0: {
    title: "Let’s start with you.",
    description: "A few details to make this space your own.",
  },
  1: {
    title: "Keep it just yours.",
    description: "A strong password for everything that’s ahead.",
  },
  2: {
    title: "Make yourself at home.",
    description: "The finishing touches. A little personality goes a long way.",
  },
};

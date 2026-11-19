import type { FieldPath } from "react-hook-form";
import type { RegisterValues } from "@/lib/validations/register.schema";

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

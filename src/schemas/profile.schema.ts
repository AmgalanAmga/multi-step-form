import { z } from "zod";
import { dateOfBirthSchema } from "./birth-date.schema";
import { IMAGE_TYPES, MAX_IMAGE_BYTES } from "@/constants";

export const imageSchema = z
  .file("Choose a profile image.")
  .max(MAX_IMAGE_BYTES, "Image must be 5 MB or smaller.")
  .mime([...IMAGE_TYPES], "Choose a JPEG, PNG, or WebP image.");

export const profileSchema = z.object({
  phoneNumber: z.string().regex(/^\d{8}$/, "Enter exactly 8 digits."),
  dateOfBirth: dateOfBirthSchema,
  profileImage: imageSchema,
});

export type ProfileValues = z.infer<typeof profileSchema>;

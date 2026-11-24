import { z } from "zod";
import { MAX_IMAGE_BYTES } from "@/constants";
import { startOfToday, subYears } from "date-fns";

const MIN_AGE = 13;

export const latestBirthDate = () => subYears(startOfToday(), MIN_AGE);

export const dateOfBirthSchema = z.iso.date("Choose a valid date.");

export const imageSchema = z.file("Choose a profile image.").max(MAX_IMAGE_BYTES, "Image must be 5 MB or smaller.");

export const profileSchema = z.object({
  phoneNumber: z.string().regex(/^\d{8}$/, "Enter exactly 8 digits."),
  dateOfBirth: dateOfBirthSchema,
  profileImage: imageSchema,
});

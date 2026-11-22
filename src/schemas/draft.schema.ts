import { z } from "zod";
import { dateOfBirthSchema } from "./birth-date.schema";

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

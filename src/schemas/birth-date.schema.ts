import { z } from "zod";
import { isAfter, parseISO, startOfToday, subYears } from "date-fns";

const MIN_AGE = 13;

export const latestBirthDate = () => subYears(startOfToday(), MIN_AGE);

const meetsMinimumAge = (value: string) => !isAfter(parseISO(value), latestBirthDate());

export const dateOfBirthSchema = z
  .string()
  .min(1, "Select your date of birth.")
  .pipe(z.iso.date("Choose a valid date."))
  .refine(meetsMinimumAge, `You must be at least ${MIN_AGE} years old.`);

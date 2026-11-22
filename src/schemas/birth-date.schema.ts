import { z } from "zod";
import { MIN_AGE } from "@/constants";
import { isFuture, isAfter, parseISO, startOfToday, subYears } from "date-fns";

export const latestBirthDate = () => subYears(startOfToday(), MIN_AGE);

const isNotFutureDate = (value: string) => !isFuture(parseISO(value));

const meetsMinimumAge = (value: string) => !isAfter(parseISO(value), latestBirthDate());

export const dateOfBirthSchema = z
  .string()
  .min(1, "Select your date of birth.")
  .pipe(z.iso.date("Choose a valid date."))
  .refine(isNotFutureDate, "Date cannot be in the future.")
  .refine(meetsMinimumAge, `You must be at least ${MIN_AGE} years old.`);

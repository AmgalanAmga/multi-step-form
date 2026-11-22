import { z } from "zod";
import { STORAGE_KEYS } from "@/constants";
import { draftSchema, personalSchema, registerSchema, type RegisterValues } from "@/schemas";
import { readStorage, removeStorage, writeStorage } from "./storage";

const completionSchema = z.union([z.literal(true), registerSchema]);

export const loadProgress = () => {
  if (readStorage(STORAGE_KEYS.success, completionSchema)) return { step: 4 as const };
  const draft = readStorage(STORAGE_KEYS.draft, draftSchema);
  if (!draft) return { step: 1 as const };

  // Passwords are never saved, so a restored draft must revisit the security step.
  const personalComplete = personalSchema.safeParse(draft.values).success;
  const step: FormStep = draft.step === 1 || !personalComplete ? 1 : 2;
  return { step, values: draft.values };
};

export const saveDraft = (step: FormStep, values: RegisterValues) => {
  const { firstName, lastName, email, phoneNumber, dateOfBirth } = values;
  writeStorage<RegistrationDraft>(STORAGE_KEYS.draft, {
    step,
    values: { firstName, lastName, email, phoneNumber, dateOfBirth },
  });
};

export const markComplete = () => {
  writeStorage(STORAGE_KEYS.success, true);
  removeStorage(STORAGE_KEYS.draft);
};

export const clearProgress = () => {
  removeStorage(STORAGE_KEYS.draft);
  removeStorage(STORAGE_KEYS.success);
};

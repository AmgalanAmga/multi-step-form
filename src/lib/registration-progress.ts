import { STORAGE_KEYS } from "@/constants";
import { draftSchema, personalSchema, type RegisterValues } from "@/schemas";
import { readStorage, removeStorage, writeStorage } from "./storage";

export const loadProgress = () => {
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

export const clearDraft = () => removeStorage(STORAGE_KEYS.draft);

import { draftSchema } from "@/schemas";

const STORAGE_KEY = "draft";

export const loadDraft = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const { step, values } = draftSchema.parse(JSON.parse(saved));

    // Saved steps are numbered from 1. Passwords must be entered again.
    const resumeStep = step > 1 ? 1 : 0;
    return { step: resumeStep, values } as const;
  } catch {
    return null;
  }
};

export const saveDraft = (step: FormStep, values: RegisterValues) => {
  const { firstName, lastName, email, phoneNumber, dateOfBirth } = values;
  const draft = { step: step + 1, values: { firstName, lastName, email, phoneNumber, dateOfBirth } };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // The form still works when browser storage is unavailable.
  }
};

export const clearDraft = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Registration has already succeeded.
  }
};

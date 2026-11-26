import { draftSchema } from "@/schemas";

const STORAGE_KEY = "draft";

export const loadDraft = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  const { step, values } = draftSchema.parse(JSON.parse(saved));

  const resumeStep = step > 1 ? 1 : 0;
  return { step: resumeStep, values } as const;
};

export const saveDraft = (step: FormStep, values: RegisterValues) => {
  const { firstName, lastName, email, phoneNumber, dateOfBirth } = values;
  const draft = { step: step + 1, values: { firstName, lastName, email, phoneNumber, dateOfBirth } };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
};

export const clearDraft = () => {
  localStorage.removeItem(STORAGE_KEY);
};

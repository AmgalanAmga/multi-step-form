import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, draftSchema, successSchema, type RegisterValues } from "@/lib/validations/register.schema";
import { STORAGE_KEYS } from "@/lib/constants";
import { readStorage, writeStorage, removeStorage } from "@/lib/storage";
import { defaults, fields } from "@/components/register/form/register-config";
import { useRegistrationSubmission } from "./useRegistrationSubmission";

export const useRegisterForm = () => {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: defaults,
  });
  const [step, setStep] = useState<FormStep>(1);
  const [hydrated, setHydrated] = useState(false);
  const [summary, setSummary] = useState<RegistrationSummary | null>(null);
  const [busy, setBusy] = useState(false);
  const pending = useRef(false);

  const { reset, setFocus } = form;

  const hydrateForm = () => {
    const success = readStorage(STORAGE_KEYS.success, successSchema);
    if (success) {
      setSummary(success);
    } else {
      const draft = readStorage(STORAGE_KEYS.draft, draftSchema);
      if (draft) {
        reset({ ...defaults, ...draft.values });
        setStep(draft.step);
      }
    }
    setHydrated(true);
  };
  // Restore browser storage after hydration to keep server and client HTML consistent.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(hydrateForm, [reset]);

  const focusCurrentStep = () => {
    if (hydrated && !summary) setFocus(fields[step][0]);
  };

  useEffect(focusCurrentStep, [hydrated, step, summary, setFocus]);
  const next = async () => {
    if (pending.current || step === 3) return;
    pending.current = true;
    setBusy(true);

    try {
      const isValid = await form.trigger(fields[step], { shouldFocus: true });
      if (!isValid) return;

      const nextStep = step === 1 ? 2 : 3;
      const { firstName, lastName, email, phoneNumber, dateOfBirth } = form.getValues();
      const draft: RegistrationDraft = {
        step: nextStep,
        values: { firstName, lastName, email, phoneNumber, dateOfBirth },
      };

      writeStorage(STORAGE_KEYS.draft, draft);
      setStep(nextStep);
    } finally {
      pending.current = false;
      setBusy(false);
    }
  };

  const completeRegistration = (result: RegistrationSummary) => {
    writeStorage(STORAGE_KEYS.success, result);
    removeStorage(STORAGE_KEYS.draft);
    setSummary(result);
    reset(defaults);
  };

  const { submit, error, setError, submissionStage } = useRegistrationSubmission(completeRegistration);

  const startOver = () => {
    removeStorage(STORAGE_KEYS.draft);
    removeStorage(STORAGE_KEYS.success);
    reset(defaults);
    setError(null);
    setStep(1);
    setSummary(null);
  };
  const disabled = busy || form.formState.isSubmitting;
  const handleInvalidSubmission: SubmitErrorHandler<RegisterValues> = (errors) => {
    const hasInvalidStep = (number: FormStep) => {
      const hasFieldError = (field: keyof RegisterValues) => {
        return errors[field];
      };
      return fields[number].some(hasFieldError);
    };
    const invalid = ([1, 2, 3] as const).find(hasInvalidStep);
    if (invalid) setStep(invalid);
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disabled) return;
    if (step < 3) {
      void next();
      return;
    }
    void form.handleSubmit(submit, handleInvalidSubmission)(event);
  };

  const handleBack = () => {
    setError(null);
    if (step > 1) setStep(step === 3 ? 2 : 1);
  };

  return { form, step, hydrated, summary, error, busy, disabled, submissionStage, startOver, handleSubmit, handleBack };
};

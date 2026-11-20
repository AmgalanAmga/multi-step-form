"use client";

import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Stepper } from "../stepper/Stepper";
import { RegisterActions } from "./RegisterActions";
import { StepSuccess } from "../success/StepSuccess";
import { RegisterStep } from "../steps/RegisterStep";
import { RegisterSkeleton } from "./RegisterSkeleton";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaults, fields, STORAGE_KEYS } from "@/lib/constants";
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import { readStorage, writeStorage, removeStorage } from "@/lib/storage";
import { registerSchema, draftSchema, successSchema, type RegisterValues } from "@/lib/validations/register.schema";

import { toast } from "sonner";
import { saveProfile, uploadProfileImage } from "@/lib/registration-client";


type UploadedImageType = {
  file: File;
  result: UploadResult;
};

export const RegisterForm = () => {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: defaults,
  });

  const pending = useRef(false);
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState<FormStep>(1);
  const [hydrated, setHydrated] = useState(false);
  const [summary, setSummary] = useState<RegistrationSummary | null>(null);

  const saving = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const uploadedImage = useRef<UploadedImageType | null>(null);
  const [submissionStage, setSubmissionStage] = useState<"uploading" | "saving">("uploading");

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

  const submit = async (values: RegisterValues) => {
    if (saving.current) return;
    saving.current = true;
    setError(null);
    try {
      let upload = uploadedImage.current;
      if (!upload || upload.file !== values.profileImage) {
        setSubmissionStage("uploading");
        const result = await uploadProfileImage(values.profileImage);
        upload = { file: values.profileImage, result };
        uploadedImage.current = upload;
      }
      setSubmissionStage("saving");
      const safeSummary = await saveProfile(values, upload.result.url);
      completeRegistration(safeSummary);
      uploadedImage.current = null;
      toast.success("Your profile is ready. Welcome!");
    } catch (cause) {
      const message = cause instanceof Error && cause.name !== "ZodError" ? cause.message : "Registration could not be completed. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      saving.current = false;
    }
  };

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
    const hasError = (field: keyof RegisterValues) => Boolean(errors[field]);
    for (const candidate of [1, 2, 3] as const) {
      if (fields[candidate].some(hasError)) {
        setStep(candidate);
        return;
      }
    }
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

  if (!hydrated) return <RegisterSkeleton />;

  return (
    <Card className="laser-card min-h-0 max-h-full gap-0 overflow-y-auto overscroll-contain py-0">
      <CardContent className="p-4 sm:p-6">
        <Stepper step={summary ? 4 : step} />
        {summary ? (
          <StepSuccess data={summary} onReset={startOver} />
        ) : (
          <form noValidate onSubmit={handleSubmit}>
            <RegisterStep step={step} form={form} disabled={disabled} />
            {error && (
              <div className="flex gap-2 p-3 mt-5 text-xs border rounded-lg border-border border-destructive/20 bg-destructive/5 text-destructive">
                <AlertCircle className="size-4 shrink-0" />
                {error}
              </div>
            )}
            <RegisterActions step={step} busy={busy} submitting={form.formState.isSubmitting} submissionStage={submissionStage} onBack={handleBack} />
          </form>
        )}
      </CardContent>
    </Card>
  );
};

"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { registerSchema, draftSchema, successSchema, type RegisterValues } from "@/lib/validations/register.schema";
import { STORAGE_KEYS } from "@/lib/constants";
import { readStorage, writeStorage, removeStorage } from "@/lib/storage";
import { Stepper } from "./stepper";
import { StepSuccess } from "./step-success";
import { defaults, fields } from "./register-config";
import { RegisterStep } from "./register-step";
import { RegisterActions } from "./register-actions";
import { RegisterSkeleton } from "./register-skeleton";
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
  const [step, setStep] = useState<FormStep>(1);
  const [hydrated, setHydrated] = useState(false);
  const [summary, setSummary] = useState<RegistrationSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const uploadedImage = useRef<UploadedImageType | null>(null);
  const [submissionStage, setSubmissionStage] = useState<"uploading" | "saving">("uploading");
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
  const submit = async (values: RegisterValues) => {
    if (pending.current) return;
    pending.current = true;
    setError(null);
    try {
      let upload = uploadedImage.current?.file === values.profileImage ? uploadedImage.current.result : null;
      if (!upload) {
        setSubmissionStage("uploading");
        upload = await uploadProfileImage(values.profileImage);
        uploadedImage.current = { file: values.profileImage, result: upload };
      }
      setSubmissionStage("saving");
      const safeSummary = await saveProfile(values, upload.url);
      writeStorage(STORAGE_KEYS.success, safeSummary);
      removeStorage(STORAGE_KEYS.draft);
      setSummary(safeSummary);
      reset(defaults);
      uploadedImage.current = null;
      toast.success("Your profile is ready. Welcome to Orbit!");
    } catch (cause) {
      const message = cause instanceof Error && cause.name !== "ZodError" ? cause.message : "Registration could not be completed. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      pending.current = false;
    }
  };
  const startOver = () => {
    uploadedImage.current = null;
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
  if (!hydrated) return <RegisterSkeleton />;

  return (
    <Card className="bg-card/90 shadow-[0_20px_80px_-35px_#233c2933,0_3px_10px_#233c2905] backdrop-blur-xl">
      <CardContent className="p-7 sm:p-10">
        <Stepper step={summary ? 4 : step} />
        {summary ? (
          <StepSuccess data={summary} onReset={startOver} />
        ) : (
          <Form {...form}>
            <form noValidate onSubmit={handleSubmit}>
              <RegisterStep step={step} form={form} disabled={disabled} />
              {error && (
                <div
                  role="alert"
                  className="flex gap-2 p-3 mt-5 text-xs border rounded-lg border-border border-destructive/20 bg-destructive/5 text-destructive"
                >
                  <AlertCircle className="size-4 shrink-0" />
                  {error}
                </div>
              )}
              <RegisterActions step={step} busy={busy} submitting={form.formState.isSubmitting} submissionStage={submissionStage} onBack={handleBack} />
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

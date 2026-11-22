"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Stepper } from "../stepper/Stepper";
import { RegisterActions } from "./RegisterActions";
import { z } from "zod";
import { RegisterStep } from "../steps/RegisterStep";
import { RegisterSkeleton } from "./RegisterSkeleton";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaults, fields, STORAGE_KEYS } from "@/constants";
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import { readStorage, writeStorage, removeStorage } from "@/lib/storage";
import { registerSchema, draftSchema, registrationFormSchema, type RegisterValues } from "@/schemas";

import { toast } from "sonner";
import { saveProfile, uploadProfileImage } from "@/lib/registration-client";


const completionSchema = z.union([z.literal(true), registerSchema]);

type UploadedImageType = {
  file: File;
  result: UploadResult;
};

export const RegisterForm = () => {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registrationFormSchema),
    mode: "onTouched",
    defaultValues: defaults,
  });

  const pending = useRef(false);
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState<FormStep | 4>(1);
  const [hydrated, setHydrated] = useState(false);

  const saving = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const uploadedImage = useRef<UploadedImageType | null>(null);
  const [submissionStage, setSubmissionStage] = useState<"uploading" | "saving">("uploading");

  const { reset, setFocus } = form;

  const hydrateForm = () => {
    const success = readStorage(STORAGE_KEYS.success, completionSchema);
    if (success) {
      setStep(4);
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
    if (hydrated && step !== 4) setFocus(fields[step][0]);
  };

  useEffect(focusCurrentStep, [hydrated, step, setFocus]);
  
  const next = async () => {
    if (pending.current || step === 3 || step === 4) return;
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

  const completeRegistration = () => {
    writeStorage(STORAGE_KEYS.success, true);
    removeStorage(STORAGE_KEYS.draft);
    setStep(4);
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
      await saveProfile(values, upload.result.url);
      completeRegistration();
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
    if (disabled || step === 4) return;
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
    <Card className="relative min-h-0 gap-0 overflow-visible rounded-[20px] border-[#ddc2ff5c] bg-transparent bg-[linear-gradient(135deg,#5c41785c,#181125b8_58%,#3e275a75)] shadow-[inset_0_1px_0_#f7e4ff33] overscroll-contain py-0">
      <CardContent className="p-4 sm:p-6">
        <Stepper step={step} />
        <form noValidate onSubmit={handleSubmit}>
          <RegisterStep step={step} form={form} disabled={disabled} />
          {error && (
            <div className="flex gap-2 p-3 mt-5 text-xs border rounded-lg border-[#49375c] border-[#ff92a7]/20 bg-[#ff92a7]/5 text-[#ff92a7]">
              <AlertCircle className="size-4 shrink-0" />
              {error}
            </div>
          )}
          {step === 4 ? (
            <Button type="button" onClick={startOver} className="h-11 w-full bg-[linear-gradient(105deg,#b694ff,#e5bdff)] text-[#241332] enabled:hover:brightness-108">
              Start over
              <ArrowRight className="shrink-0" size={16} />
            </Button>
          ) : (
            <RegisterActions step={step} busy={busy} submitting={form.formState.isSubmitting} submissionStage={submissionStage} onBack={handleBack} />
          )}
        </form>
      </CardContent>
    </Card>
  );
};

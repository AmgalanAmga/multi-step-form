"use client";

import { useForm } from "react-hook-form";
import { Stepper } from "../stepper/Stepper";
import { defaults, fields } from "@/constants";
import { Button } from "@/components/ui/button";
import { RegisterActions } from "./RegisterActions";
import { useEffect, useRef, useState } from "react";
import { RegisterStep } from "../steps/RegisterStep";
import { RegisterSkeleton } from "./RegisterSkeleton";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { registrationFormSchema, type RegisterValues } from "@/schemas";
import { saveProfile, uploadProfileImage } from "@/lib/registration-client";
import { clearDraft, loadProgress, saveDraft } from "@/lib/registration-progress";

export const RegisterForm = () => {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registrationFormSchema),
    mode: "onTouched",
    defaultValues: defaults,
  });

  const [error, setError] = useState("");
  const [step, setStep] = useState<0 | FormStep | 4>(0);
  const uploadedImage = useRef<UploadedImageType | null>(null);

  const { reset, setFocus } = form;
  const { isSubmitting } = form.formState;

  const restoreProgress = () => {
    const progress = loadProgress();
    if ("values" in progress) reset({ ...defaults, ...progress.values });
    setStep(progress.step);
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(restoreProgress, [reset]);

  const focusStep = () => {
    if (step && step !== 4) setFocus(fields[step][0]);
  };

  useEffect(focusStep, [step, setFocus]);

  const submit = async (values: RegisterValues) => {
    setError("");
    try {
      const file = values.profileImage;
      if (uploadedImage.current?.file !== file) {
        uploadedImage.current = { file, result: await uploadProfileImage(file) };
      }
      await saveProfile(values, uploadedImage.current.result.url);
      uploadedImage.current = null;
      clearDraft();
      reset(defaults);
      setStep(4);
    } catch (cause) {
      setError(cause instanceof Error && cause.name !== "ZodError" ? cause.message : "Registration failed. Please try again.");
    }
  };

  const startOver = () => {
    setStep(1);
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || !step || step === 4) return;

    if (step === 3) {
      await form.handleSubmit(submit)();
      return;
    }

    const valid = await form.trigger(fields[step], { shouldFocus: true });
    if (!valid) return;

    const nextStep = step === 1 ? 2 : 3;
    saveDraft(nextStep, form.getValues());
    setStep(nextStep);
  };

  const handleBack = () => {
    setError("");
    setStep(step === 3 ? 2 : 1);
  };

  if (step === 0) return <RegisterSkeleton />;

  return (
    <Card className="relative min-h-0 gap-0 overflow-visible rounded-[20px] border-[#ddc2ff5c] bg-transparent bg-[linear-gradient(135deg,#5c41785c,#181125b8_58%,#3e275a75)] shadow-[inset_0_1px_0_#f7e4ff33] overscroll-contain py-0">
      <CardContent className="p-4 sm:p-6">
        <Stepper step={step} />
        <form noValidate onSubmit={handleSubmit}>
          <RegisterStep step={step} form={form} disabled={isSubmitting} />
          {error && (
            <div className="flex gap-2 p-3 mt-5 text-xs border rounded-lg border-[#49375c] border-[#ff92a7]/20 bg-[#ff92a7]/5 text-[#ff92a7]">
              <AlertCircle className="size-4 shrink-0" />
              {error}
            </div>
          )}
          {step === 4 ? (
            <Button
              type="button"
              onClick={startOver}
              className="h-11 w-full bg-[linear-gradient(105deg,#b694ff,#e5bdff)] text-[#241332] enabled:hover:brightness-108"
            >
              Start over
              <ArrowRight className="shrink-0" size={16} />
            </Button>
          ) : (
            <RegisterActions step={step} isSubmitting={isSubmitting} onBack={handleBack} />
          )}
        </form>
      </CardContent>
    </Card>
  );
};

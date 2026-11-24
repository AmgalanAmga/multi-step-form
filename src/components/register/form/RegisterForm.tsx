"use client";

import { useForm } from "react-hook-form";
import { Stepper } from "../stepper/Stepper";
import { defaults, fields } from "@/constants";
import { Button } from "@/components/ui/button";
import { RegisterSkeleton } from "./RegisterSkeleton";
import { RegisterActions } from "./RegisterActions";
import { useEffect, useRef, useState } from "react";
import { RegisterStep } from "../steps/RegisterStep";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { registrationFormSchema } from "@/schemas";
import { saveProfile, uploadProfileImage } from "@/lib/registration-client";
import { clearDraft, loadDraft, saveDraft } from "@/lib/registration-progress";

export const RegisterForm = () => {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registrationFormSchema),
    mode: "onTouched",
    defaultValues: defaults,
  });

  const [isHydrating, setIsHydrating] = useState(true);
  const [error, setError] = useState("");
  const [step, setStep] = useState<FormStep | 3>(0);
  const uploadedImage = useRef<UploadedImageType | null>(null);

  const { reset, setFocus } = form;
  const { isSubmitting } = form.formState;

  const restoreProgress = () => {
    const draft = loadDraft();
    if (draft) {
      reset({ ...defaults, ...draft.values });
      setStep(draft.step);
    }
    setIsHydrating(false);
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(restoreProgress, [reset]);

  const focusStep = () => {
    if (!isHydrating && step !== 3) setFocus(fields[step][0]);
  };

  useEffect(focusStep, [isHydrating, step, setFocus]);

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
      setStep(3);
    } catch (cause) {
      setError(cause instanceof Error && cause.name !== "ZodError" ? cause.message : "Registration failed. Please try again.");
    }
  };

  const startOver = () => {
    setStep(0);
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || step === 3) return;
    if (step === 2) return form.handleSubmit(submit)(event);

    const valid = await form.trigger(fields[step], { shouldFocus: true });
    if (!valid) return;

    const nextStep = step === 0 ? 1 : 2;
    saveDraft(nextStep, form.getValues());
    setStep(nextStep);
  };

  const handleBack = () => {
    setError("");
    setStep(step === 2 ? 1 : 0);
  };

  if (isHydrating) return <RegisterSkeleton />;

  return (
    <Card className="relative gap-0 rounded-[20px] border-[#ddc2ff5c] bg-transparent py-0">
      <CardContent className="p-4 sm:p-6">
        <Stepper step={step + 1} />

        <form noValidate onSubmit={handleSubmit}>
          <RegisterStep step={step} form={form} disabled={isSubmitting} />
          {error && (
            <div className="flex gap-2 p-3 mt-5 text-xs border rounded-lg border-[#49375c] border-[#ff92a7]/20 bg-[#ff92a7]/5 text-[#ff92a7]">
              <AlertCircle className="size-4 shrink-0" />
              {error}
            </div>
          )}
          {step === 3 ? (
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

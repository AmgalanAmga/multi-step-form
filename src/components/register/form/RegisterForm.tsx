"use client";

import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Stepper } from "../stepper/Stepper";
import { CardContent } from "@/components/ui/card";
import { RegisterActions } from "./RegisterActions";
import { StepSuccess } from "../success/StepSuccess";
import { RegisterStep } from "../steps/RegisterStep";
import { RegisterSkeleton } from "./RegisterSkeleton";
import { useRegisterForm } from "@/hooks/useRegisterForm";

export const RegisterForm = () => {
  const { form, step, hydrated, summary, error, busy, disabled, submissionStage, startOver, handleSubmit, handleBack } = useRegisterForm();

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

"use client";

import { AlertCircle } from "lucide-react";
import { Form } from "@/components/ui/Form";
import { Card } from "@/components/ui/Card";
import { CardContent } from "@/components/ui/CardContent";
import { Stepper } from "../stepper/Stepper";
import { StepSuccess } from "../success/StepSuccess";
import { RegisterStep } from "../steps/RegisterStep";
import { RegisterActions } from "./RegisterActions";
import { RegisterSkeleton } from "./RegisterSkeleton";
import { useRegisterForm } from "@/hooks/useRegisterForm";

export const RegisterForm = () => {
  const { form, step, hydrated, summary, error, busy, disabled, submissionStage, startOver, handleSubmit, handleBack } = useRegisterForm();

  if (!hydrated) return <RegisterSkeleton />;

  return (
    <Card className="min-h-0 max-h-full overflow-y-auto overscroll-contain bg-card/90 shadow-[0_20px_80px_-35px_#193e2b33,0_3px_10px_#193e2b05] backdrop-blur-xl">
      <CardContent className="p-4 sm:p-6 [@media(min-height:850px)]:sm:p-9">
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

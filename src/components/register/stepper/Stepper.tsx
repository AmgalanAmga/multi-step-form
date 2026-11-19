"use client";

import { Progress } from "@/components/ui/Progress";
import { StepIndicator } from "./StepIndicator";

type StepperType = {
  step: number;
};

export const Stepper = ({ step }: StepperType) => {
  return (
    <nav className="mb-4">
      <div className="relative">
        <div className="absolute h-px top-4 right-8 left-8 bg-slate-200" />
        <ol className="relative flex justify-between">
          <StepIndicator step={step} index={0} />
          <StepIndicator step={step} index={1} />
          <StepIndicator step={step} index={2} />
        </ol>
      </div>
      <Progress value={step === 4 ? 100 : ((step - 1) / 3) * 100} className="h-1 mt-6" />
    </nav>
  );
};

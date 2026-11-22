import { copy } from "@/constants";
import { StepProfile } from "./StepProfile";
import { StepSecurity } from "./StepSecurity";
import { StepPersonal } from "./StepPersonal";
import type { UseFormReturn } from "react-hook-form";
import type { RegisterValues } from "@/schemas";

import { StepSuccess } from "./StepSuccess";

const stepComponents = [StepPersonal, StepSecurity, StepProfile, StepSuccess] as const;

type RegisterStepType = {
  step: FormStep | 4;
  disabled: boolean;
  form: UseFormReturn<RegisterValues>;
};

export const RegisterStep = ({ step, form, disabled }: RegisterStepType) => {
  if (step === 4) {
    const Success = stepComponents[3];
    return <Success />;
  }

  const ActiveStep = stepComponents[step - 1];
  const { title, description } = copy[step];

  return (
    <>
      <header className="mb-4">
        <p className="mb-2 text-xs font-semibold tracking-widest text-[#c5a6ff] uppercase">Step {step} of 3</p>
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 text-xs leading-5 text-[#c3b7d4]">{description}</p>
      </header>

      <fieldset disabled={disabled} className="min-w-0">
        <ActiveStep form={form} />
      </fieldset>
    </>
  );
};

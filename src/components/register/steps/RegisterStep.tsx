import { copy } from "@/constants";
import { StepProfile } from "./StepProfile";
import { StepSuccess } from "./StepSuccess";
import { StepSecurity } from "./StepSecurity";
import { StepPersonal } from "./StepPersonal";
import type { RegisterValues } from "@/schemas";
import type { UseFormReturn } from "react-hook-form";

const stepComponents = [StepPersonal, StepSecurity, StepProfile, StepSuccess] as const;

type RegisterStepType = {
  disabled: boolean;
  step: FormStep | 4;
  form: UseFormReturn<RegisterValues>;
};

export const RegisterStep = ({ step, form, disabled }: RegisterStepType) => {
  if (step === 4) {
    const Success = stepComponents[3];
    return <Success />;
  }

  const { title, description } = copy[step];
  const ActiveStep = stepComponents[step - 1];

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

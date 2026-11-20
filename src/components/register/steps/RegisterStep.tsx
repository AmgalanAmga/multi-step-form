import { StepProfile } from "./StepProfile";
import { StepSecurity } from "./StepSecurity";
import { StepPersonal } from "./StepPersonal";
import { copy } from "@/lib/constants";
import type { UseFormReturn } from "react-hook-form";
import { MotionPanel } from "@/components/register/form/MotionPanel";
import type { RegisterValues } from "@/lib/validations/register.schema";

const stepComponents = [StepPersonal, StepSecurity, StepProfile];

type RegisterStepType = {
  step: FormStep;
  disabled: boolean;
  form: UseFormReturn<RegisterValues>;
};

export const RegisterStep = ({ step, form, disabled }: RegisterStepType) => {
  const ActiveStep = stepComponents[step - 1];
  const { title, description } = copy[step];

  return (
    <>
      <MotionPanel key={`heading-${step}`} className="mb-4">
        <p className="mb-2 text-xs font-semibold tracking-widest text-[#c5a6ff] uppercase">Step {step} of 3</p>
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 text-xs leading-5 text-[#c3b7d4]">{description}</p>
      </MotionPanel>

      <fieldset disabled={disabled} className="min-w-0">
        <MotionPanel key={step}>
          <ActiveStep form={form} />
        </MotionPanel>
      </fieldset>
    </>
  );
};

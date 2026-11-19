import type { UseFormReturn } from "react-hook-form";
import type { RegisterValues } from "@/lib/validations/register.schema";
import { MotionPanel } from "@/components/ui/MotionPanel";
import { copy } from "../form/register-config";
import { StepPersonal } from "./StepPersonal";
import { StepSecurity } from "./StepSecurity";
import { StepProfile } from "./StepProfile";

const stepComponents = [StepPersonal, StepSecurity, StepProfile];

type RegisterStepType = {
  step: FormStep;
  form: UseFormReturn<RegisterValues>;
  disabled: boolean;
};

export const RegisterStep = ({ step, form, disabled }: RegisterStepType) => {
  const ActiveStep = stepComponents[step - 1];
  const { title, description } = copy[step];

  return (
    <>
      <MotionPanel key={`heading-${step}`} className="mb-4">
        <p className="mb-2 text-xs font-semibold tracking-widest text-emerald-700 uppercase">Step {step} of 3</p>
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 text-xs leading-5 text-slate-600">{description}</p>
      </MotionPanel>
      <fieldset disabled={disabled} className="min-w-0">
        <MotionPanel key={step}>
          <ActiveStep form={form} />
        </MotionPanel>
      </fieldset>
    </>
  );
};

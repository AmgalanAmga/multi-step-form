import { StepConnector } from "./StepConnector";
import { StepIndicator } from "./StepIndicator";

export const Stepper = ({ step }: { step: number }) => (
  <nav className="relative mb-6">
    <div className="absolute inset-x-4 top-4 flex h-0.5 bg-border">
      <StepConnector filled={step > 1} />
      <StepConnector filled={step > 2} />
    </div>
    <ol className="grid grid-cols-3">
      <StepIndicator step={step} number={1} />
      <StepIndicator step={step} number={2} />
      <StepIndicator step={step} number={3} />
    </ol>
  </nav>
);

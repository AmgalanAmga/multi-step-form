"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { STEPS } from "@/lib/constants";
import { Progress } from "@/components/ui/progress";
import { Check, User, Lock, Camera } from "lucide-react";

type StepperType = {
  step: number;
};

type StepIndicatorType = { step: number; index: 0 | 1 | 2 };

const icons = [User, Lock, Camera];

const StepIndicator = ({ step, index }: StepIndicatorType) => {
  const label = STEPS[index];
  const number = index + 1;
  const Icon = icons[index];

  return (
    <li className="relative flex flex-col items-center gap-2.5">
      <motion.span
        initial={false}
        animate={{ scale: step === number ? 1.08 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className={cn(
          "grid size-8 place-items-center rounded-full border border-border text-xs font-semibold ",
          step >= number ? "border-primary bg-primary text-primary-foreground shadow-sm" : "border-border bg-card text-muted-foreground",
        )}
      >
        {step > number ? <Check size={15} /> : number}
      </motion.span>
      <span className={cn("flex items-center gap-1.5 text-[11px]", step === number ? "font-semibold text-foreground" : "text-muted-foreground")}>
        <Icon size={12} />
        {label}
      </span>
    </li>
  );
};
export const Stepper = ({ step }: StepperType) => {
  return (
    <nav className="mb-9">
      <div className="relative">
        <div className="absolute h-px top-4 right-8 left-8 bg-border" />
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

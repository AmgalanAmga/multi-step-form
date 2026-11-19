"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { STEPS } from "@/lib/constants";
import { Check, User, Lock, Camera } from "lucide-react";

const icons = [User, Lock, Camera];

type StepperType = {
  step: number;
};

export const Stepper = ({ step }: StepperType) => {
  const renderConnector = (label: string, index: number) => (
    <span
      key={label}
      className={cn(
        "flex-1 origin-left bg-emerald-700 transition-transform duration-300 motion-reduce:transition-none",
        step > index + 1 ? "scale-x-100" : "scale-x-0",
      )}
    />
  );

  const renderStep = (label: string, index: number) => {
    const number = index + 1;
    const Icon = icons[index];

    return (
      <li key={label} aria-current={step === number ? "step" : undefined} className="flex flex-col items-center gap-2.5 first:items-start last:items-end">
        <motion.span
          initial={false}
          animate={{ scale: step === number ? 1.08 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className={cn(
            "relative z-10 grid size-8 place-items-center rounded-full border border-slate-200 text-xs font-semibold ",
            step >= number ? "border-emerald-700 bg-emerald-700 text-white shadow-sm" : "border-slate-200 bg-white text-slate-600",
          )}
        >
          {step > number ? <><Check size={15} aria-hidden="true" /><span className="sr-only">Completed</span></> : number}
        </motion.span>
        <span className={cn("flex items-center gap-1.5 text-xs", step === number ? "font-semibold text-emerald-950" : "text-slate-600")}>
          <Icon size={12} />
          {label}
        </span>
      </li>
    );
  };

  return (
    <nav aria-label="Registration steps" className="relative mb-6">
      <div aria-hidden="true" className="absolute inset-x-4 top-4 flex h-0.5 bg-slate-200">
        {STEPS.slice(1).map(renderConnector)}
      </div>
      <ol className="grid grid-cols-3">{STEPS.map(renderStep)}</ol>
    </nav>
  );
};

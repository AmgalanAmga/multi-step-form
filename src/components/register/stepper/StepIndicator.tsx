"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { STEPS } from "@/lib/constants";
import { Check, User, Lock, Camera } from "lucide-react";

const icons = [User, Lock, Camera];

type StepIndicatorProps = { step: number; number: 1 | 2 | 3 };

export const StepIndicator = ({ step, number }: StepIndicatorProps) => {
  const Icon = icons[number - 1];
  const label = STEPS[number - 1];

  return (
    <li className="flex flex-col items-center gap-2.5 first:items-start last:items-end">
      <motion.span
        initial={false}
        animate={{ scale: step === number ? 1.08 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className={cn(
          "relative z-10 grid size-8 place-items-center rounded-full border border-slate-200 text-xs font-semibold ",
          step >= number ? "border-emerald-700 bg-emerald-700 text-white shadow-sm" : "border-slate-200 bg-white text-slate-600",
        )}
      >
        {step > number ? <Check size={15} /> : number}
      </motion.span>
      <span className={cn("flex items-center gap-1.5 text-xs", step === number ? "font-semibold text-emerald-950" : "text-slate-600")}>
        <Icon size={12} />
        {label}
      </span>
    </li>
  );
};

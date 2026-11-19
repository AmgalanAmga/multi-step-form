"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { STEPS } from "@/lib/constants";
import { Check, User, Lock, Camera } from "lucide-react";

type StepIndicatorType = { step: number; index: 0 | 1 | 2 };

const icons = [User, Lock, Camera];

export const StepIndicator = ({ step, index }: StepIndicatorType) => {
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
          "grid size-8 place-items-center rounded-full border border-slate-200 text-xs font-semibold ",
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

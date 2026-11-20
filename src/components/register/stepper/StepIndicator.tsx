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
          "relative z-10 grid size-8 place-items-center rounded-full border border-[#49375c] text-xs font-semibold ",
          step >= number ? "border-[#c5a6ff] bg-[#c5a6ff] text-[#211030] shadow-[0_0_14px_#bc84ff50]" : "border-[#49375c] bg-[#16121d] text-[#c3b7d4]",
        )}
      >
        {step > number ? <Check size={15} /> : number}
      </motion.span>
      <span className={cn("flex items-center gap-1.5 text-xs", step === number ? "font-semibold text-[#f6f2ff]" : "text-[#c3b7d4]")}>
        <Icon size={12} />
        {label}
      </span>
    </li>
  );
};

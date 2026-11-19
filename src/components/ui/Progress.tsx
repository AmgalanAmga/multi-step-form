"use client";
import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ProgressType = Omit<ComponentProps<"div">, "children"> & {
  value?: number | null;
  max?: number;
};

export const Progress = ({ className, value = 0, max = 100, ...props }: ProgressType) => {
  const maximum = Number.isFinite(max) && max > 0 ? max : 100;
  const current = typeof value === "number" && Number.isFinite(value) ? Math.min(maximum, Math.max(0, value)) : 0;

  return (
    <div
      {...props}
      data-state={current === maximum ? "complete" : "loading"}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/10", className)}
    >
      <motion.div
        className="h-full w-full flex-1 rounded-full bg-primary "
        initial={false}
        animate={{ x: `${(current / maximum) * 100 - 100}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
};

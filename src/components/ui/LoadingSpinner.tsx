"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => {
  const reducedMotion = useReducedMotion();
  return (
    <motion.span
      className="inline-flex"
      animate={{ rotate: reducedMotion ? 0 : 360 }}
      transition={{
        duration: 1,
        repeat: reducedMotion ? 0 : Infinity,
        ease: "linear",
      }}
    >
      <Loader2 className="shrink-0 size-4" />
    </motion.span>
  );
};

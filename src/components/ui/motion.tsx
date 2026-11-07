"use client";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";

type MotionPanelType = HTMLMotionProps<"div">;
export const MotionPanel = ({ children, ...props }: MotionPanelType) => (
  <motion.div
    initial={{ opacity: 0, y: 7 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
    {...props}
  >
    {children}
  </motion.div>
);

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
      <Loader2 className="size-4" />
    </motion.span>
  );
};

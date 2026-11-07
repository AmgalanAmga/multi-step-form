"use client";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
type SkeletonType = HTMLMotionProps<"div">;
export const Skeleton = ({ className, ...props }: SkeletonType) => {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={cn("rounded-lg bg-muted", className)}
      animate={{ opacity: reducedMotion ? 1 : [1, 0.45, 1] }}
      transition={{
        duration: 1.8,
        repeat: reducedMotion ? 0 : Infinity,
        ease: "easeInOut",
      }}
      {...props}
    />
  );
};

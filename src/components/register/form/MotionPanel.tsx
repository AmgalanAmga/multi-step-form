"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type MotionPanelType = HTMLMotionProps<"div">;

export const MotionPanel = ({ children, ...props }: MotionPanelType) => (
  <motion.div initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} {...props}>
    {children}
  </motion.div>
);

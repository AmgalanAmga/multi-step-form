import { cn } from "@/lib/utils";

export const StepConnector = ({ filled }: { filled: boolean }) => (
  <span
    className={cn(
      "flex-1 origin-left bg-primary transition-transform duration-300 motion-reduce:transition-none",
      filled ? "scale-x-100" : "scale-x-0",
    )}
  />
);

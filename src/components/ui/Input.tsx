import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
type InputType = ComponentProps<"input">;
export const Input = ({ className, type, ...props }: InputType) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-lg border border-border border-input bg-background/60 px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
};

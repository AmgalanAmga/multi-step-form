import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
type InputType = ComponentProps<"input">;
export const Input = ({ className, type, ...props }: InputType) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-lg border border-slate-200 border-slate-400 bg-green-50/60 px-3 py-2 text-sm shadow-xs placeholder:text-slate-600/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700/40 focus-visible:border-emerald-700 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
};

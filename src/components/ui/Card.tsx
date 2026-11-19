import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type CardType = ComponentProps<"div">;

export const Card = ({ className, ...props }: CardType) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white text-emerald-950 shadow-sm",
        className,
      )}
      {...props}
    />
  );
};

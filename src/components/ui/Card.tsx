import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type CardType = ComponentProps<"div">;

export const Card = ({ className, ...props }: CardType) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card text-card-foreground shadow-sm",
        className,
      )}
      {...props}
    />
  );
};

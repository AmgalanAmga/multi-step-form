import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const CalendarOption = ({ className, ...props }: ComponentProps<"option">) => (
  <option {...props} className={cn("bg-popover text-popover-foreground", className)} />
);

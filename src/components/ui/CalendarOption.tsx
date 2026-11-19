import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const CalendarOption = ({ className, ...props }: ComponentProps<"option">) => (
  <option {...props} className={cn("bg-white text-emerald-950", className)} />
);

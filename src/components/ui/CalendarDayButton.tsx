import { DayButton, type DayButtonProps } from "react-day-picker";
import { cn } from "@/lib/utils";

export const CalendarDayButton = ({ modifiers, className, ...props }: DayButtonProps) => (
  <DayButton
    {...props}
    modifiers={modifiers}
    className={cn(
      className,
      modifiers.selected && "bg-emerald-700 text-white",
      modifiers.today && "ring-1 ring-emerald-700/40",
    )}
  />
);

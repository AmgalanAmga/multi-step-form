import { DayButton, type DayButtonProps } from "react-day-picker";
import { cn } from "@/lib/utils";

export const CalendarDayButton = ({ modifiers, className, ...props }: DayButtonProps) => (
  <DayButton
    {...props}
    modifiers={modifiers}
    className={cn(
      className,
      modifiers.selected && "bg-primary text-primary-foreground",
      modifiers.today && "ring-1 ring-primary/40",
    )}
  />
);

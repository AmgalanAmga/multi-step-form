"use client";
import { DayPicker } from "react-day-picker";
import { CalendarDayButton } from "./CalendarDayButton";
import { CalendarOption } from "./CalendarOption";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
type CalendarType = ComponentProps<typeof DayPicker>;
export const Calendar = ({
  className,
  classNames,
  components,
  showOutsideDays = true,
  ...props
}: CalendarType) => (
  <DayPicker
    showOutsideDays={showOutsideDays}
    navLayout="after"
    components={{ DayButton: CalendarDayButton, Option: CalendarOption, ...components }}
    className={cn("relative p-3 text-sm", className)}
    classNames={{
      months: "relative flex flex-col gap-4 sm:flex-row",
      month: "space-y-3",
      month_caption: "relative flex h-9 items-center justify-center px-9",
      caption_label: "flex items-center gap-1 text-sm font-medium",
      dropdowns: "flex items-center gap-2",
      dropdown_root:
        "relative rounded-md px-1 focus-within:ring-2 focus-within:ring-ring",
      dropdown:
        "absolute inset-0 w-full cursor-pointer opacity-0",
      nav: "absolute inset-x-0 top-0 flex justify-between",
      button_previous:
        "z-10 grid cursor-pointer disabled:cursor-wait size-9 place-items-center rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30",
      button_next:
        "z-10 grid cursor-pointer disabled:cursor-wait size-9 place-items-center rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30",
      chevron: "size-4 fill-current",
      month_grid: "w-full border-collapse",
      weekday:
        "h-8 w-9 text-center text-[11px] font-normal text-muted-foreground",
      day: "size-9 p-0 text-center",
      day_button:
        "grid cursor-pointer disabled:cursor-wait size-9 place-items-center rounded-md text-xs hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      today: "font-bold",
      outside: "text-muted-foreground opacity-40",
      disabled: "pointer-events-none opacity-30",
      hidden: "invisible",
      ...classNames,
    }}
    {...props}
  />
);

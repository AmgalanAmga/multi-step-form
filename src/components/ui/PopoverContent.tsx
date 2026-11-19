"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type PopoverContentType = ComponentProps<typeof PopoverPrimitive.Content>;

export const PopoverContent = ({
  className,
  align = "center",
  sideOffset = 6,
  ...props
}: PopoverContentType) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 max-w-[calc(100vw-2rem)] rounded-xl border border-slate-200 bg-white p-4 text-emerald-950 shadow-lg outline-none",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
};

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
          "z-50 max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-none",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
};

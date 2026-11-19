"use client";
import * as LabelPrimitive from "@radix-ui/react-label";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
type LabelType = ComponentProps<typeof LabelPrimitive.Root>;
export const Label = ({ className, ...props }: LabelType) => {
  return (
    <LabelPrimitive.Root
      className={cn(
        "text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  );
};

"use client";

import { MotionPanel } from "./MotionPanel";
import { type ComponentProps } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FormMessageType = ComponentProps<"p"> & { message?: string };

export const FormMessage = ({ message, className, ...props }: FormMessageType) => {
  if (!message) return null;
  return (
    <MotionPanel>
      <p
        role="alert"
        className={cn(
          "flex items-start gap-1.5 text-xs text-rose-700",
          className,
        )}
        {...props}
      >
        <AlertCircle className="mt-0.5 size-3 shrink-0" />
        {message}
      </p>
    </MotionPanel>
  );
};

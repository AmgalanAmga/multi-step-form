"use client";

import { MotionPanel } from "./MotionPanel";
import { useContext, type ComponentProps } from "react";
import { useFormContext } from "react-hook-form";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ItemContext, FieldContext } from "./form-context";

type FormMessageType = ComponentProps<"p">;

export const FormMessage = ({ className, ...props }: FormMessageType) => {
  const { id } = useContext(ItemContext);
  const { name } = useContext(FieldContext);
  const { getFieldState, formState } = useFormContext();
  const { error } = getFieldState(name, formState);
  if (!error) return null;
  return (
    <MotionPanel>
      <p
        id={`${id}-message`}
        role="alert"
        className={cn(
          "flex items-start gap-1.5 text-[11px] text-rose-700",
          className,
        )}
        {...props}
      >
        <AlertCircle className="mt-0.5 size-3 shrink-0" />
        {String(error.message ?? "")}
      </p>
    </MotionPanel>
  );
};

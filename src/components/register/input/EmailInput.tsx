"use client";

import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useController } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

export const EmailInput = ({ name, control }: RegistrationFieldProps<"email">) => {
  const { field, fieldState } = useController({ name, control });
  return (
    <Field className={fieldState.invalid ? "invalid-field gap-2 text-destructive" : "gap-2"}>
      <FieldLabel htmlFor={field.name}>Email address</FieldLabel>

      <div className="relative">
        <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-600" />
        <Input id={field.name} {...field} type="email" autoComplete="email" placeholder="you@example.com" className="pl-10 field-control h-11" />
      </div>

      <FieldError id={`${field.name}-error`}>{fieldState.error?.message}</FieldError>
      <p className="text-xs text-slate-600">A little connection starts with the right address.</p>
    </Field>
  );
};

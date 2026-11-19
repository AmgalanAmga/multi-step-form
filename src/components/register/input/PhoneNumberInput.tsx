"use client";

import { useController } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";

export const PhoneNumberInput = ({ name, control }: RegistrationFieldProps<"phoneNumber">) => {
  const { field, fieldState } = useController({ name, control });
  return (
    <Field data-invalid={fieldState.invalid} className="gap-2">
      <FieldLabel htmlFor={field.name}>Phone number</FieldLabel>
      <div className="relative">
        <Phone className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-600" />
        <Input id={field.name} {...field} type="tel" autoComplete="tel" placeholder="+97699112233" className="h-11 pl-10" />
      </div>
      <FieldError id={`${field.name}-error`}>{fieldState.error?.message}</FieldError>
    </Field>
  );
};

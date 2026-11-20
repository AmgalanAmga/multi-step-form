"use client";

import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useController } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

export const PhoneNumberInput = ({ name, control }: RegistrationFieldProps<"phoneNumber">) => {
  const { field, fieldState } = useController({ name, control });

  return (
    <Field className={fieldState.invalid ? "invalid-field gap-2 text-destructive" : "gap-2"}>
      <FieldLabel htmlFor={field.name}>Phone number</FieldLabel>

      <div className="relative">
        <Phone className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input id={field.name} {...field} type="tel" autoComplete="tel" placeholder="+97699112233" className="field-control pl-10 h-11" />
      </div>

      <FieldError id={`${field.name}-error`}>{fieldState.error?.message}</FieldError>
    </Field>
  );
};

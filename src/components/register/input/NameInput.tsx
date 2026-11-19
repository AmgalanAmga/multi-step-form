"use client";

import { useController } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import { User } from "lucide-react";
import { Input } from "@/components/ui/input";

export const NameInput = ({ name, control }: RegistrationFieldProps<"firstName" | "lastName">) => {
  const { field, fieldState } = useController({ name, control });
  const isFirstName = field.name === "firstName";
  return (
    <Field data-invalid={fieldState.invalid} className="gap-2">
      <FieldLabel htmlFor={field.name}>{isFirstName ? "First name" : "Last name"}</FieldLabel>
      <div className="relative">
        <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-600" />
        <Input id={field.name}
          {...field}
          autoComplete={isFirstName ? "given-name" : "family-name"}
          placeholder={isFirstName ? "e.g. Alex" : "e.g. Morgan"}
          className="h-11 pl-10"
        />
      </div>
      <FieldError id={`${field.name}-error`}>{fieldState.error?.message}</FieldError>
    </Field>
  );
};

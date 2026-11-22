"use client";

import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useController } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

export const NameInput = ({ name, control }: RegistrationFieldProps<"firstName" | "lastName">) => {
  const { field, fieldState } = useController({ name, control });

  const isFirstName = field.name === "firstName";

  return (
    <Field className={fieldState.invalid ? "gap-2 text-[#ff92a7]" : "gap-2"}>
      <FieldLabel htmlFor={field.name}>{isFirstName ? "First name" : "Last name"}</FieldLabel>

      <div className="relative">
        <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#c3b7d4]" />
        <Input
          id={field.name}
          {...field}
          autoComplete={isFirstName ? "given-name" : "family-name"}
          placeholder={isFirstName ? "e.g. Alex" : "e.g. Morgan"}
          className="pl-10 rounded-[9px] border-[#d8c1f459] bg-[#110c1861]! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd8aff] h-11"
        />
      </div>

      <FieldError id={`${field.name}-error`}>{fieldState.error?.message}</FieldError>
    </Field>
  );
};

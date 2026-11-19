"use client";

import { User } from "lucide-react";
import { FormItem } from "@/components/register/form/FormItem";
import { Label as FormLabel } from "@/components/ui/label";
import { Slot as FormControl } from "@radix-ui/react-slot";
import { FormMessage } from "@/components/register/form/FormMessage";
import { Input } from "@/components/ui/input";

export const NameInput: RegistrationFieldRendererType<"firstName" | "lastName"> = ({ field, fieldState }) => {
  const isFirstName = field.name === "firstName";
  return (
    <FormItem>
      <FormLabel htmlFor={field.name}>{isFirstName ? "First name" : "Last name"}</FormLabel>
      <div className="relative">
        <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-600" />
        <FormControl id={field.name} aria-invalid={fieldState.invalid} aria-describedby={fieldState.error ? `${field.name}-error` : undefined}>
          <Input
            {...field}
            autoComplete={isFirstName ? "given-name" : "family-name"}
            placeholder={isFirstName ? "e.g. Alex" : "e.g. Morgan"}
            className="h-11 pl-10"
          />
        </FormControl>
      </div>
      <FormMessage id={`${field.name}-error`} message={fieldState.error?.message} />
    </FormItem>
  );
};

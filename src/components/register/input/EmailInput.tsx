"use client";

import { Mail } from "lucide-react";
import { FormItem } from "@/components/register/form/FormItem";
import { Label as FormLabel } from "@/components/ui/label";
import { Slot as FormControl } from "@radix-ui/react-slot";
import { FormMessage } from "@/components/register/form/FormMessage";
import { Input } from "@/components/ui/input";

export const EmailInput: RegistrationFieldRendererType<"email"> = ({ field, fieldState }) => (
  <FormItem>
    <FormLabel htmlFor={field.name}>Email address</FormLabel>
    <div className="relative">
      <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-600" />
      <FormControl id={field.name} aria-invalid={fieldState.invalid} aria-describedby={fieldState.error ? `${field.name}-error` : undefined}>
        <Input {...field} type="email" autoComplete="email" placeholder="you@example.com" className="h-11 pl-10" />
      </FormControl>
    </div>
    <FormMessage id={`${field.name}-error`} message={fieldState.error?.message} />
    <p className="text-xs text-slate-600">A little connection starts with the right address.</p>
  </FormItem>
);

"use client";

import type { UseFormReturn } from "react-hook-form";
import { FormField } from "@/components/register/form/FormField";
import type { RegisterValues } from "@/lib/validations/register.schema";
import { PasswordInput } from "../input/PasswordInput";

type StepSecurityType = { form: UseFormReturn<RegisterValues> };

export const StepSecurity = ({ form }: StepSecurityType) => (
  <div className="space-y-5">
    <FormField control={form.control} name="password" component={PasswordInput} />
    <FormField control={form.control} name="confirmPassword" component={PasswordInput} />
  </div>
);

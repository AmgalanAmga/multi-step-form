"use client";

import type { UseFormReturn } from "react-hook-form";
import { PasswordInput } from "../input/PasswordInput";
import type { RegisterValues } from "@/lib/validations/register.schema";

type StepSecurityType = { form: UseFormReturn<RegisterValues> };

export const StepSecurity = ({ form }: StepSecurityType) => (
  <div className="space-y-5">
    <PasswordInput control={form.control} name="password" />
    <PasswordInput control={form.control} name="confirmPassword" />
  </div>
);

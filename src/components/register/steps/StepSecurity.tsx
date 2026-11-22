"use client";

import type { RegisterValues } from "@/schemas";
import type { UseFormReturn } from "react-hook-form";
import { PasswordInput } from "../input/PasswordInput";

type StepSecurityType = { form: UseFormReturn<RegisterValues> };

export const StepSecurity = ({ form }: StepSecurityType) => (
  <div className="space-y-5">
    <PasswordInput control={form.control} name="password" />
    <PasswordInput control={form.control} name="confirmPassword" />
  </div>
);

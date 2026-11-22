"use client";

import { NameInput } from "../input/NameInput";
import { EmailInput } from "../input/EmailInput";
import type { UseFormReturn } from "react-hook-form";
import type { RegisterValues } from "@/schemas";

type StepPersonalType = { form: UseFormReturn<RegisterValues> };

export const StepPersonal = ({ form }: StepPersonalType) => (
  <div className="space-y-5">
    <div className="grid gap-5 sm:grid-cols-2">
      <NameInput control={form.control} name="firstName" />
      <NameInput control={form.control} name="lastName" />
    </div>
    
    <EmailInput control={form.control} name="email" />
  </div>
);

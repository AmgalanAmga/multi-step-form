"use client";

import type { UseFormReturn } from "react-hook-form";
import { FormField } from "@/components/register/form/FormField";
import type { RegisterValues } from "@/lib/validations/register.schema";
import { NameInput } from "../input/NameInput";
import { EmailInput } from "../input/EmailInput";

type StepPersonalType = { form: UseFormReturn<RegisterValues> };

export const StepPersonal = ({ form }: StepPersonalType) => (
  <div className="space-y-5">
    <div className="grid gap-5 sm:grid-cols-2">
      <FormField control={form.control} name="firstName" component={NameInput} />
      <FormField control={form.control} name="lastName" component={NameInput} />
    </div>
    <FormField control={form.control} name="email" component={EmailInput} />
  </div>
);

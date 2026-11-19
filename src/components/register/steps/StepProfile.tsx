"use client";

import { type UseFormReturn } from "react-hook-form";
import { FormField } from "@/components/register/form/FormField";
import { type RegisterValues } from "@/lib/validations/register.schema";
import { PhoneNumberInput } from "../input/PhoneNumberInput";
import { DateOfBirthInput } from "../input/DateOfBirthInput";
import { ProfileImageInput } from "../input/ProfileImageInput";

type StepProfileType = {
  form: UseFormReturn<RegisterValues>;
};

export const StepProfile = ({ form }: StepProfileType) => {
  return (
    <div className="space-y-5">
      <FormField control={form.control} name="phoneNumber" component={PhoneNumberInput} />
      <FormField control={form.control} name="dateOfBirth" component={DateOfBirthInput} />
      <FormField control={form.control} name="profileImage" component={ProfileImageInput} />
    </div>
  );
};

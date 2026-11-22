"use client";

import { type UseFormReturn } from "react-hook-form";
import { PhoneNumberInput } from "../input/PhoneNumberInput";
import { DateOfBirthInput } from "../input/DateOfBirthInput";
import { ProfileImageInput } from "../input/ProfileImageInput";
import type { RegisterValues } from "@/schemas";

type StepProfileType = {
  form: UseFormReturn<RegisterValues>;
};

export const StepProfile = ({ form }: StepProfileType) => {
  return (
    <div className="space-y-5">
      <PhoneNumberInput control={form.control} name="phoneNumber" />
      <DateOfBirthInput control={form.control} name="dateOfBirth" />
      <ProfileImageInput control={form.control} name="profileImage" />
    </div>
  );
};

"use client";

import { ImageUpload } from "./ImageUpload";
import { useController } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

export const ProfileImageInput = ({ name, control }: RegistrationFieldProps<"profileImage">) => {
  const { field, fieldState, formState } = useController({ name, control });

  return (
    <Field className={fieldState.invalid ? "invalid-field gap-2 text-destructive" : "gap-2"}>
      <FieldLabel htmlFor={field.name}>Profile photo</FieldLabel>

      <ImageUpload id={field.name} value={field.value} disabled={formState.isSubmitting} onChange={field.onChange} onBlur={field.onBlur} />

      <FieldError id={`${field.name}-error`}>{fieldState.error?.message}</FieldError>
    </Field>
  );
};

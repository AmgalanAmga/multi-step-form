"use client";

import { FormItem } from "@/components/register/form/FormItem";
import { Label as FormLabel } from "@/components/ui/label";
import { Slot as FormControl } from "@radix-ui/react-slot";
import { FormMessage } from "@/components/register/form/FormMessage";
import { ImageUpload } from "./ImageUpload";

export const ProfileImageInput: RegistrationFieldRendererType<"profileImage"> = ({ field, fieldState, formState }) => {
  return (
    <FormItem>
      <FormLabel htmlFor={field.name}>Profile photo</FormLabel>
      <FormControl id={field.name} aria-invalid={fieldState.invalid} aria-describedby={fieldState.error ? `${field.name}-error` : undefined}>
        <ImageUpload value={field.value} disabled={formState.isSubmitting} onChange={field.onChange} onBlur={field.onBlur} />
      </FormControl>
      <FormMessage id={`${field.name}-error`} message={fieldState.error?.message} />
    </FormItem>
  );
};

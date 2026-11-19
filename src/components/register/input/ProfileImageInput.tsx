"use client";

import { useFormContext } from "react-hook-form";
import { FormItem } from "@/components/ui/FormItem";
import { FormLabel } from "@/components/ui/FormLabel";
import { FormControl } from "@/components/ui/FormControl";
import { FormMessage } from "@/components/ui/FormMessage";
import { ImageUpload } from "./ImageUpload";
import { type RegisterValues } from "@/lib/validations/register.schema";

export const ProfileImageInput: RegistrationFieldRendererType<"profileImage"> = ({ field }) => {
  const form = useFormContext<RegisterValues>();

  const handleChange = (file: File | undefined) => {
    field.onChange(file);
    void form.trigger("profileImage");
  };

  return (
    <FormItem>
      <FormLabel>Profile photo</FormLabel>
      <FormControl>
        <ImageUpload value={field.value} disabled={form.formState.isSubmitting} onChange={handleChange} onBlur={field.onBlur} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

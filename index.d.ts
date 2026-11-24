import type { registrationFormSchema } from "@/schemas";
import type { z } from "zod";
import type { Control } from "react-hook-form";

declare global {
  type RegisterValues = z.infer<typeof registrationFormSchema>;

  type FormStep = 0 | 1 | 2;

  type UploadResult = { url: string };

  type ApiError = { error: string };

  type UploadedImageType = {
    file: File;
    result: UploadResult;
  };

  type RegistrationFieldProps<Name extends keyof RegisterValues> = { control: Control<RegisterValues>; name: Name };
}

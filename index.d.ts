import type { Control, FieldPath } from "react-hook-form";
import type { z } from "zod";
import type { RegisterValues, draftSchema } from "@/schemas";

declare global {
  type FormStep = 1 | 2 | 3;

  type RegistrationDraft = z.infer<typeof draftSchema>;

  type UploadResult = { url: string };

  type ApiError = { error: string };

  type UploadedImageType = {
    file: File;
    result: UploadResult;
  };

  type RegistrationFieldProps<Name extends FieldPath<RegisterValues>> = { control: Control<RegisterValues>; name: Name };
}

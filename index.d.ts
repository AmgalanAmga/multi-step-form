import type { ControllerProps, FieldPath } from "react-hook-form";
import type { z } from "zod";
import type { RegisterValues, successSchema, draftSchema } from "@/lib/validations/register.schema";

declare global {
  type FormStep = 1 | 2 | 3;
  type RegistrationPayload = Omit<RegisterValues, "confirmPassword" | "profileImage"> & { profileImage: string };
  type RegistrationSummary = z.infer<typeof successSchema>;
  type RegistrationDraft = z.infer<typeof draftSchema>;
  type UploadResult = { url: string; publicId: string };
  type ApiError = { error: string };

  type RegistrationFieldRendererType<Name extends FieldPath<RegisterValues>> = ControllerProps<RegisterValues, Name>["render"];
}

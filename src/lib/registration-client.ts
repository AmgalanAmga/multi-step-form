import { z } from "zod";
import { successSchema, type RegisterValues } from "@/lib/validations/register.schema";

const SAVE_TIMEOUT_MS = 90_000;
const UPLOAD_TIMEOUT_MS = 90_000;
const apiErrorSchema = z.object({ error: z.string() });
const uploadSchema = z.object({ url: successSchema.shape.profileImage });

export const uploadProfileImage = async (file: File): Promise<UploadResult> => {
  const body = new FormData();
  body.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body,
    signal: AbortSignal.timeout(UPLOAD_TIMEOUT_MS),
  });

  const result: unknown = await response.json();

  if (!response.ok) {
    const parsed = apiErrorSchema.safeParse(result);
    throw new Error(parsed.success ? parsed.data.error : "Upload failed. Please try again.");
  }

  return uploadSchema.parse(result);
};

export const saveProfile = async (values: RegisterValues, imageUrl: string): Promise<RegistrationSummary> => {
  const payload = successSchema.parse({
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    phoneNumber: values.phoneNumber,
    dateOfBirth: values.dateOfBirth,
    profileImage: imageUrl,
  });

  const response = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(SAVE_TIMEOUT_MS),
  });

  const result: unknown = await response.json();

  if (!response.ok) {
    const parsed = apiErrorSchema.safeParse(result);
    throw new Error(parsed.success ? parsed.data.error : "Registration could not be saved. Please try again.");
  }

  return successSchema.parse(result);
};

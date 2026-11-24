import { z } from "zod";
import { profileImageUrlSchema } from "@/schemas";

const SAVE_TIMEOUT_MS = 90_000;
const UPLOAD_TIMEOUT_MS = 90_000;
const uploadSchema = z.object({ url: profileImageUrlSchema });

export const uploadProfileImage = async (file: File): Promise<UploadResult> => {
  const body = new FormData();
  body.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body,
    signal: AbortSignal.timeout(UPLOAD_TIMEOUT_MS),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(typeof result?.error === "string" ? result.error : "Upload failed. Please try again.");
  }

  return uploadSchema.parse(result);
};

export const saveProfile = async (values: RegisterValues, imageUrl: string): Promise<void> => {
  const { firstName, lastName, email, phoneNumber, dateOfBirth } = values;
  const payload = { firstName, lastName, email, phoneNumber, dateOfBirth, profileImage: imageUrl };

  const response = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(SAVE_TIMEOUT_MS),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(typeof result?.error === "string" ? result.error : "Registration could not be saved. Please try again.");
  }
};

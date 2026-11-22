import "server-only";
import { put } from "@vercel/blob";
import { randomUUID } from "node:crypto";

export const uploadImage = async (file: File): Promise<UploadResult> => {
  const id = randomUUID();

  await put(`profile-images/${id}`, file, { access: "private", contentType: file.type });

  return { url: `/api/profile-images/${id}` };
};

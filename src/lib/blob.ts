import "server-only";
import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";

export const uploadImage = async (file: File): Promise<UploadResult> => {
  const id = randomUUID();

  await put(`profile-images/${id}`, file, { access: "private", contentType: file.type });
  
  return { url: `/api/profile-images/${id}` };
};

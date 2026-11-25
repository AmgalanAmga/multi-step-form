"use server";
import { put } from "@vercel/blob";
import { randomUUID } from "node:crypto";

export const uploadProfileImage = async (file: File): Promise<string> => {
  const id = randomUUID();

  const blob = await put(`profile-images/${id}`, file, { access: "private", contentType: file.type });

  return blob.pathname;
};

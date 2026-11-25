"use server";
import { put } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import type { RegistrationPayload } from "@/schemas";

export const uploadProfileImage = async (file: File): Promise<string> => {
  const id = randomUUID();

  const blob = await put(`profile-images/${id}`, file, { access: "private", contentType: file.type });

  return blob.pathname;
};

export const saveProfile = async (values: RegistrationPayload): Promise<void> => {
  const registration = {
    ...values,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };

  await put(`registrations/${registration.id}.json`, JSON.stringify(registration), {
    access: "private",
    contentType: "application/json",
  });
};

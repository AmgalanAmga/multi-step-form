"use server";
import { put } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import type { RegistrationPayload } from "@/schemas";

type StoredRegistrationType = RegistrationPayload & {
  id: string;
  createdAt: string;
};

export const uploadProfileImage = async (file: File): Promise<string> => {
  const id = randomUUID();

  const blob = await put(`profile-images/${id}`, file, { access: "private", contentType: file.type });

  return blob.pathname;
};

export const saveProfile = async (values: RegistrationPayload): Promise<void> => {
  const registration: StoredRegistrationType = {
    ...values,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };

  await put(`registrations/${registration.id}.json`, JSON.stringify(registration), {
    access: "private",
    contentType: "application/json",
  });
};

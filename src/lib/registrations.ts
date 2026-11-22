import "server-only";
import { put } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import type { RegistrationPayload } from "@/schemas";

type StoredRegistrationType = RegistrationPayload & {
  id: string;
  createdAt: string;
};

export const saveRegistration = async (values: RegistrationPayload): Promise<StoredRegistrationType> => {
  const registration: StoredRegistrationType = {
    ...values,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };

  await put(`registrations/${registration.id}.json`, JSON.stringify(registration), {
    access: "private",
    contentType: "application/json",
  });

  return registration;
};

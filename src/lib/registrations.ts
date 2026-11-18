import "server-only";
import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";
import { successSchema } from "@/lib/validations/register.schema";

type StoredRegistrationType = RegistrationSummary & {
  id: string;
  createdAt: string;
};

export const saveRegistration = async (values: RegistrationSummary): Promise<StoredRegistrationType> => {
  const registration: StoredRegistrationType = {
    ...successSchema.parse(values),
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  await put(`registrations/${registration.id}.json`, JSON.stringify(registration), {
    access: "private",
    contentType: "application/json",
  });

  return registration;
};

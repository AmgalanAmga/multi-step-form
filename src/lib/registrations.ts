import "server-only";
import { randomUUID } from "node:crypto";
import { getCloudinary } from "@/lib/cloudinary";
import { UPLOAD_TIMEOUT_MS } from "@/lib/constants";
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
  const json = Buffer.from(JSON.stringify(registration), "utf8").toString("base64");

  await getCloudinary().uploader.upload(`data:application/json;base64,${json}`, {
    resource_type: "raw",
    type: "authenticated",
    folder: "registrations",
    public_id: `${registration.id}.json`,
    overwrite: false,
    timeout: UPLOAD_TIMEOUT_MS,
  });

  return registration;
};

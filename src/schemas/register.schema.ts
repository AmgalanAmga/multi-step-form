import { z } from "zod";
import { profileSchema } from "./profile.schema";
import { personalSchema } from "./personal.schema";
import { securitySchema } from "./security.schema";

const registrationFields = personalSchema.extend(profileSchema.shape);

export const registrationFormSchema = registrationFields.and(securitySchema);

export const registerSchema = registrationFields.extend({
  profileImage: z.templateLiteral(["/api/profile-images/", z.uuid()]),
});

export type RegisterValues = z.infer<typeof registrationFormSchema>;
export type RegistrationPayload = z.infer<typeof registerSchema>;

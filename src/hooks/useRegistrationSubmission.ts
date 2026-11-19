import { useRef, useState } from "react";
import type { RegisterValues } from "@/lib/validations/register.schema";
import { toast } from "sonner";
import { saveProfile, uploadProfileImage } from "@/lib/registration-client";

type UploadedImageType = {
  file: File;
  result: UploadResult;
};

export const useRegistrationSubmission = (onSuccess: (summary: RegistrationSummary) => void) => {
  const saving = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const uploadedImage = useRef<UploadedImageType | null>(null);
  const [submissionStage, setSubmissionStage] = useState<"uploading" | "saving">("uploading");

  const submit = async (values: RegisterValues) => {
    if (saving.current) return;
    saving.current = true;
    setError(null);
    try {
      let upload = uploadedImage.current?.file === values.profileImage ? uploadedImage.current.result : null;
      if (!upload) {
        setSubmissionStage("uploading");
        upload = await uploadProfileImage(values.profileImage);
        uploadedImage.current = { file: values.profileImage, result: upload };
      }
      setSubmissionStage("saving");
      const safeSummary = await saveProfile(values, upload.url);
      onSuccess(safeSummary);
      uploadedImage.current = null;
      toast.success("Your profile is ready. Welcome!");
    } catch (cause) {
      const message = cause instanceof Error && cause.name !== "ZodError" ? cause.message : "Registration could not be completed. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      saving.current = false;
    }
  };

  return { submit, error, setError, submissionStage };
};

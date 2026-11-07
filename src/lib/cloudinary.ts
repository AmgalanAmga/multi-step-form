import "server-only";
import { v2 as cloudinary } from "cloudinary";
import { UPLOAD_TIMEOUT_MS } from "@/lib/constants";
const isMissing = (value: string | undefined) => !value;

export const getCloudinary = () => {
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const api_key = process.env.CLOUDINARY_API_KEY?.trim();
  const api_secret = process.env.CLOUDINARY_API_SECRET?.trim();
  if ([cloud_name, api_key, api_secret].some(isMissing))
    throw Object.assign(new Error("Missing Cloudinary configuration."), {
      code: "CLOUDINARY_CONFIG_MISSING",
    });
  cloudinary.config({ cloud_name, api_key, api_secret, secure: true });
  return cloudinary;
};

export const uploadImage = async (file: File): Promise<UploadResult> => {
  const client = getCloudinary();
  const buffer = Buffer.from(await file.arrayBuffer());
  const image = `data:${file.type};base64,${buffer.toString("base64")}`;

  const result = await client.uploader.upload(image, {
    folder: "profile-images",
    resource_type: "image",
    allowed_formats: ["jpg", "png", "webp"],
    timeout: UPLOAD_TIMEOUT_MS,
  });

  return { url: result.secure_url, publicId: result.public_id };
};

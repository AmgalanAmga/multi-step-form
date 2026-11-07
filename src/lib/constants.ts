export const STORAGE_KEYS = {
  draft: "orbit:registration:v1",
  success: "orbit:registration:success:v1",
} as const;
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const MIN_AGE = 13;
export const STEPS = ["Personal info", "Security", "Profile"] as const;

export const UPLOAD_TIMEOUT_MS = 60_000;

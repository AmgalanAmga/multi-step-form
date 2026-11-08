type UploadFailureType = {
  status: number;
  body: ApiError;
};

type ProviderErrorType = {
  error?: unknown;
  cause?: unknown;
  message?: unknown;
  http_code?: unknown;
};

const asProviderError = (value: unknown): ProviderErrorType => (typeof value === "object" && value !== null ? value : {});

export const getUploadFailure = (cause: unknown): UploadFailureType => {
  const outer = asProviderError(cause);
  const error = asProviderError(outer.error ?? outer.cause ?? cause);
  const message = typeof error.message === "string" && error.message.trim() ? error.message : "Image upload failed.";
  const status =
    typeof error.http_code === "number" && Number.isInteger(error.http_code) && error.http_code >= 400 && error.http_code <= 599 ? error.http_code : 500;

  return { status, body: { error: message } };
};

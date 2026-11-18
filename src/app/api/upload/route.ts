import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/blob";
import { getUploadFailure } from "@/lib/upload-errors";
import { imageSchema } from "@/lib/validations/register.schema";

export const runtime = "nodejs";

export const POST = async (request: Request) => {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json<ApiError>({ error: "Send the image as form data." }, { status: 400 });
  }

  const result = imageSchema.safeParse(formData.get("file"));

  if (!result.success) {
    return NextResponse.json<ApiError>({ error: result.error.issues[0].message }, { status: 400 });
  }

  if (result.data.size === 0) {
    return NextResponse.json<ApiError>({ error: "Choose an image that is not empty." }, { status: 400 });
  }

  try {
    const image = await uploadImage(result.data);
    return NextResponse.json<UploadResult>(image);
  } catch (error) {
    const failure = getUploadFailure(error);
    return NextResponse.json<ApiError>(failure.body, { status: failure.status });
  }
};

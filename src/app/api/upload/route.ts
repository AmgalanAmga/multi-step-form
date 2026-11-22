import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/blob";
import { imageSchema } from "@/schemas";

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
  } catch {
    return NextResponse.json<ApiError>({ error: "Image upload failed. Please try again." }, { status: 500 });
  }
};

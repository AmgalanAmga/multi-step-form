import { uploadImage } from "@/lib/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export const POST = async (request: Request) => {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  try {
    const image = await uploadImage(file);
    return NextResponse.json<UploadResult>(image);
  } catch {
    return NextResponse.json<ApiError>({ error: "Image upload failed. Please try again." }, { status: 500 });
  }
};

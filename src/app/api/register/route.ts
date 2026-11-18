import { NextResponse } from "next/server";
import { getUploadFailure } from "@/lib/upload-errors";
import { saveRegistration } from "@/lib/registrations";
import { successSchema } from "@/lib/validations/register.schema";

export const runtime = "nodejs";

const errorResponse = (error: string, status: number) => NextResponse.json<ApiError>({ error }, { status });

export const POST = async (request: Request) => {
  let data: unknown;

  try {
    data = await request.json();
  } catch {
    return errorResponse("Send valid JSON data.", 400);
  }

  const result = successSchema.safeParse(data);

  if (!result.success) {
    return errorResponse(result.error.issues[0].message, 400);
  }

  try {
    const registration = await saveRegistration(result.data);
    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    const failure = getUploadFailure(error);
    return errorResponse(failure.body.error, failure.status);
  }
};

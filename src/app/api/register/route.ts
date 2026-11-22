import { NextResponse } from "next/server";
import { saveRegistration } from "@/lib/registrations";
import { registerSchema } from "@/schemas";

export const runtime = "nodejs";

const errorResponse = (error: string, status: number) => NextResponse.json<ApiError>({ error }, { status });

export const POST = async (request: Request) => {
  let data: unknown;

  try {
    data = await request.json();
  } catch {
    return errorResponse("Send valid JSON data.", 400);
  }

  const result = registerSchema.safeParse(data);

  if (!result.success) {
    return errorResponse(result.error.issues[0].message, 400);
  }

  try {
    const registration = await saveRegistration(result.data);
    return NextResponse.json(registration, { status: 201 });
  } catch {
    return errorResponse("Registration could not be saved. Please try again.", 500);
  }
};

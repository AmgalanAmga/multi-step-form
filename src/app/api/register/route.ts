import { NextResponse } from "next/server";
import type { RegistrationPayload } from "@/schemas";
import { saveRegistration } from "@/lib/registrations";

export const runtime = "nodejs";

export const POST = async (request: Request) => {
  const payload: RegistrationPayload = await request.json();

  try {
    const registration = await saveRegistration(payload);
    return NextResponse.json(registration, { status: 201 });
  } catch {
    return NextResponse.json<ApiError>({ error: "Registration could not be saved. Please try again." }, { status: 500 });
  }
};

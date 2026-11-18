import { get } from "@vercel/blob";
import { z } from "zod";

export const GET = async (_request: Request, context: RouteContext<"/api/profile-images/[id]">) => {
  const { id } = await context.params;
  if (!z.uuid().safeParse(id).success) return new Response(null, { status: 404 });
  const image = await get(`profile-images/${id}`, { access: "private" });
  if (!image || image.statusCode !== 200) return new Response(null, { status: 404 });
  return new Response(image.stream, { headers: {
    "Content-Type": image.blob.contentType,
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
  } });
};

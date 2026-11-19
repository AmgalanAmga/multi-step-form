import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type CardContentType = ComponentProps<"div">;

export const CardContent = ({ className, ...props }: CardContentType) => {
  return <div className={cn("p-6", className)} {...props} />;
};

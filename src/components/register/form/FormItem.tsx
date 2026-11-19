"use client";

import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

type FormItemType = ComponentProps<"div">;

export const FormItem = ({ className, ...props }: FormItemType) => {
  return <div className={cn("space-y-2", className)} {...props} />;
};

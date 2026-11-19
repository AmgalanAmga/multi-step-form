"use client";

import { useId, type ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { ItemContext } from "./form-context";

type FormItemType = ComponentProps<"div">;

export const FormItem = ({ className, ...props }: FormItemType) => {
  const id = useId();
  return (
    <ItemContext.Provider value={{ id }}>
      <div className={cn("space-y-2", className)} {...props} />
    </ItemContext.Provider>
  );
};

"use client";

import { User } from "lucide-react";
import { FormItem } from "@/components/ui/FormItem";
import { FormLabel } from "@/components/ui/FormLabel";
import { FormControl } from "@/components/ui/FormControl";
import { FormMessage } from "@/components/ui/FormMessage";
import { Input } from "@/components/ui/Input";

export const NameInput: RegistrationFieldRendererType<"firstName" | "lastName"> = ({ field }) => {
  const isFirstName = field.name === "firstName";
  return (
    <FormItem>
      <FormLabel>{isFirstName ? "First name" : "Last name"}</FormLabel>
      <div className="relative">
        <User className="pointer-events-none absolute left-3.5 top-3.75 size-3.75 text-slate-600" />
        <FormControl>
          <Input
            {...field}
            autoComplete={isFirstName ? "given-name" : "family-name"}
            placeholder={isFirstName ? "e.g. Alex" : "e.g. Morgan"}
            className="pl-10"
          />
        </FormControl>
      </div>
      <FormMessage />
    </FormItem>
  );
};

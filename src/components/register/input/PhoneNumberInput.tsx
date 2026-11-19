"use client";

import { Phone } from "lucide-react";
import { FormItem } from "@/components/ui/FormItem";
import { FormLabel } from "@/components/ui/FormLabel";
import { FormControl } from "@/components/ui/FormControl";
import { FormMessage } from "@/components/ui/FormMessage";
import { Input } from "@/components/ui/Input";

export const PhoneNumberInput: RegistrationFieldRendererType<"phoneNumber"> = ({ field }) => {
  return (
    <FormItem>
      <FormLabel>Phone number</FormLabel>
      <div className="relative">
        <Phone className="pointer-events-none absolute left-3.5 top-3.75 size-3.75 text-slate-600" />
        <FormControl>
          <Input {...field} type="tel" autoComplete="tel" placeholder="+97699112233" className="pl-10" />
        </FormControl>
      </div>
      <FormMessage />
    </FormItem>
  );
};

"use client";

import { Mail } from "lucide-react";
import { FormItem } from "@/components/ui/FormItem";
import { FormLabel } from "@/components/ui/FormLabel";
import { FormControl } from "@/components/ui/FormControl";
import { FormMessage } from "@/components/ui/FormMessage";
import { Input } from "@/components/ui/Input";

export const EmailInput: RegistrationFieldRendererType<"email"> = ({ field }) => (
  <FormItem>
    <FormLabel>Email address</FormLabel>
    <div className="relative">
      <Mail className="pointer-events-none absolute left-3.5 top-3.75 size-3.75 text-slate-600" />
      <FormControl>
        <Input {...field} type="email" autoComplete="email" placeholder="you@example.com" className="pl-10" />
      </FormControl>
    </div>
    <FormMessage />
    <p className="text-xs text-slate-600">A little connection starts with the right address.</p>
  </FormItem>
);

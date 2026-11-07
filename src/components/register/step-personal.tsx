"use client";
import type { UseFormReturn } from "react-hook-form";
import { Mail, User } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { RegisterValues } from "@/lib/validations/register.schema";

type StepPersonalType = { form: UseFormReturn<RegisterValues> };

const NameInput: RegistrationFieldRendererType<"firstName" | "lastName"> = ({ field }) => {
  const isFirstName = field.name === "firstName";
  return (
    <FormItem>
      <FormLabel>{isFirstName ? "First name" : "Last name"}</FormLabel>
      <div className="relative">
        <User className="pointer-events-none absolute left-3.5 top-3.75 size-3.75 text-muted-foreground" />
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

const EmailInput: RegistrationFieldRendererType<"email"> = ({ field }) => (
  <FormItem>
    <FormLabel>Email address</FormLabel>
    <div className="relative">
      <Mail className="pointer-events-none absolute left-3.5 top-3.75 size-3.75 text-muted-foreground" />
      <FormControl>
        <Input {...field} type="email" autoComplete="email" placeholder="you@example.com" className="pl-10" />
      </FormControl>
    </div>
    <FormMessage />
    <p className="text-[11px] text-muted-foreground">A little connection starts with the right address.</p>
  </FormItem>
);

export const StepPersonal = ({ form }: StepPersonalType) => (
  <div className="space-y-5">
    <div className="grid gap-5 sm:grid-cols-2">
      <FormField control={form.control} name="firstName" component={NameInput} />
      <FormField control={form.control} name="lastName" component={NameInput} />
    </div>
    <FormField control={form.control} name="email" component={EmailInput} />
  </div>
);

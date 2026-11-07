"use client";
import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { RegisterValues } from "@/lib/validations/register.schema";

type StepSecurityType = { form: UseFormReturn<RegisterValues> };
const invertVisibility = (previous: boolean) => !previous;

const PasswordInput: RegistrationFieldRendererType<"password" | "confirmPassword"> = ({ field }) => {
  const [visible, setVisible] = useState(false);
  const isPassword = field.name === "password";
  const handleTogglePassword = () => setVisible(invertVisibility);

  return (
    <FormItem>
      <FormLabel>{isPassword ? "Password" : "Confirm password"}</FormLabel>
      <div className="relative">
        <Lock className="pointer-events-none absolute left-3.5 top-3.75 size-3.75 text-muted-foreground" />
        <FormControl>
          <Input
            {...field}
            type={visible ? "text" : "password"}
            autoComplete="new-password"
            className="px-10"
            placeholder={isPassword ? "Create a strong password" : "Enter your password again"}
          />
        </FormControl>
        <Button type="button" variant="ghost" size="icon" className="absolute top-1 right-1 size-9" onClick={handleTogglePassword}>
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </Button>
      </div>
      <FormMessage />
    </FormItem>
  );
};

export const StepSecurity = ({ form }: StepSecurityType) => (
  <div className="space-y-5">
    <FormField control={form.control} name="password" component={PasswordInput} />
    <FormField control={form.control} name="confirmPassword" component={PasswordInput} />
  </div>
);

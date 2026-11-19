"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { FormItem } from "@/components/register/form/FormItem";
import { Label as FormLabel } from "@/components/ui/label";
import { Slot as FormControl } from "@radix-ui/react-slot";
import { FormMessage } from "@/components/register/form/FormMessage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const invertVisibility = (previous: boolean) => !previous;

export const PasswordInput: RegistrationFieldRendererType<"password" | "confirmPassword"> = ({ field, fieldState }) => {
  const [visible, setVisible] = useState(false);
  const isPassword = field.name === "password";
  const handleTogglePassword = () => setVisible(invertVisibility);

  return (
    <FormItem>
      <FormLabel htmlFor={field.name}>{isPassword ? "Password" : "Confirm password"}</FormLabel>
      <div className="relative">
        <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-600" />
        <FormControl id={field.name} aria-invalid={fieldState.invalid} aria-describedby={fieldState.error ? `${field.name}-error` : undefined}>
          <Input
            {...field}
            type={visible ? "text" : "password"}
            autoComplete="new-password"
            className="h-11 px-10"
            placeholder={isPassword ? "Create a strong password" : "Enter your password again"}
          />
        </FormControl>
        <Button type="button" variant="ghost" size="icon" aria-label={visible ? "Hide password" : "Show password"} className="absolute top-1/2 right-1 size-9 -translate-y-1/2" onClick={handleTogglePassword}>
          {visible ? <EyeOff className="shrink-0" size={16} /> : <Eye className="shrink-0" size={16} />}
        </Button>
      </div>
      <FormMessage id={`${field.name}-error`} message={fieldState.error?.message} />
    </FormItem>
  );
};

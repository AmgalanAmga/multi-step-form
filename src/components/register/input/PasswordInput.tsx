"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useController } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

const invertVisibility = (previous: boolean) => !previous;

export const PasswordInput = ({ name, control }: RegistrationFieldProps<"password" | "confirmPassword">) => {
  const [visible, setVisible] = useState(false);
  const { field, fieldState } = useController({ name, control });

  const isPassword = field.name === "password";

  const handleTogglePassword = () => setVisible(invertVisibility);

  return (
    <Field className={fieldState.invalid ? "gap-2 text-[#ff92a7]" : "gap-2"}>
      <FieldLabel htmlFor={field.name}>{isPassword ? "Password" : "Confirm password"}</FieldLabel>

      <div className="relative">
        <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#c3b7d4]" />
        <Input
          id={field.name}
          {...field}
          type={visible ? "text" : "password"}
          placeholder={isPassword ? "Create a strong password" : "Enter your password again"}
          className="px-10 rounded-[9px] border-[#d8c1f459] bg-[#110c1861]! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd8aff] h-11"
        />
        <Button type="button" variant="ghost" size="icon" className="absolute -translate-y-1/2 top-1/2 right-1 size-9" onClick={handleTogglePassword}>
          {visible ? <EyeOff className="shrink-0" size={16} /> : <Eye className="shrink-0" size={16} />}
        </Button>
      </div>

      <FieldError id={`${field.name}-error`}>{fieldState.error?.message}</FieldError>
    </Field>
  );
};

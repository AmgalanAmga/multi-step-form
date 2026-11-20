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
    <Field className={fieldState.invalid ? "invalid-field gap-2 text-[#ff92a7]" : "gap-2"}>
      <FieldLabel htmlFor={field.name}>{isPassword ? "Password" : "Confirm password"}</FieldLabel>

      <div className="relative">
        <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#c3b7d4]" />
        <Input
          id={field.name}
          {...field}
          type={visible ? "text" : "password"}
          autoComplete="new-password"
          className="px-10 rounded-[9px]! border-[#d8c1f459]! bg-[linear-gradient(165deg,#eeddff21,#7e5fa20f_52%)] bg-[#110c1861]! shadow-[inset_0_1px_0_#ffffff24]! backdrop-blur-[10px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd8aff] in-[.invalid-field]:border-[#ff92a7]! h-11"
          placeholder={isPassword ? "Create a strong password" : "Enter your password again"}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          title={visible ? "Hide password" : "Show password"}
          className="absolute -translate-y-1/2 top-1/2 right-1 size-9"
          onClick={handleTogglePassword}
        >
          {visible ? <EyeOff className="shrink-0" size={16} /> : <Eye className="shrink-0" size={16} />}
        </Button>
      </div>

      <FieldError id={`${field.name}-error`}>{fieldState.error?.message}</FieldError>
    </Field>
  );
};

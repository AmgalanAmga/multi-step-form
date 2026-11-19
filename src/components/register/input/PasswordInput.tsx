"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { FormItem } from "@/components/ui/FormItem";
import { FormLabel } from "@/components/ui/FormLabel";
import { FormControl } from "@/components/ui/FormControl";
import { FormMessage } from "@/components/ui/FormMessage";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const invertVisibility = (previous: boolean) => !previous;

export const PasswordInput: RegistrationFieldRendererType<"password" | "confirmPassword"> = ({ field }) => {
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

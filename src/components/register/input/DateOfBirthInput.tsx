"use client";

import { useState } from "react";
import { latestBirthDate } from "@/schemas";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { useController } from "react-hook-form";
import { Popover } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@/components/ui/popover";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

export const DateOfBirthInput = ({ name, control }: RegistrationFieldProps<"dateOfBirth">) => {
  const {
    field: { ref: inputRef, value, onChange, onBlur },
    fieldState,
  } = useController({ name, control });
  const [open, setOpen] = useState(false);

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) onBlur();
  };

  const handleSelect = (date: Date | undefined) => {
    onChange(date ? format(date, "yyyy-MM-dd") : "");
    onBlur();
    setOpen(false);
  };

  const isDateDisabled = (date: Date) => {
    return date > latestBirthDate() || date < new Date(1900, 0);
  };
  return (
    <Field className={fieldState.invalid ? "invalid-field gap-2 text-[#ff92a7]" : "gap-2"}>
      <FieldLabel htmlFor={name}>Date of birth</FieldLabel>

      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            id={name}
            ref={inputRef}
            type="button"
            variant="outline"
            className="rounded-[9px]! border-[#d8c1f459]! bg-[linear-gradient(165deg,#eeddff21,#7e5fa20f_52%)] bg-[#110c1861]! shadow-[inset_0_1px_0_#ffffff24]! backdrop-blur-[10px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd8aff] in-[.invalid-field]:border-[#ff92a7]! h-11 w-full justify-start gap-3 rounded-lg border-[#705e85] px-3.5 font-normal shadow-none"
          >
            <CalendarIcon className="size-4 shrink-0 text-[#c3b7d4]" />
            {value ? format(parseISO(value), "MMMM d, yyyy") : <span className="text-[#c3b7d4]">Choose your birthday</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto bg-[#21152e] p-0 text-[#f6f2ff]" align="start">
          <Calendar
            autoFocus
            mode="single"
            onSelect={handleSelect}
            captionLayout="dropdown"
            disabled={isDateDisabled}
            endMonth={latestBirthDate()}
            startMonth={new Date(1900, 0)}
            selected={value ? parseISO(value) : undefined}
            defaultMonth={value ? parseISO(value) : latestBirthDate()}
          />
        </PopoverContent>
      </Popover>

      <FieldError id={`${name}-error`}>{fieldState.error?.message}</FieldError>
      <p className="text-xs text-[#c3b7d4]">You must be 13 or older to join.</p>
    </Field>
  );
};

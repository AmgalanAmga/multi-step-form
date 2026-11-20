"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { useController } from "react-hook-form";
import { Popover } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@/components/ui/popover";
import { latestBirthDate } from "@/lib/validations/register.schema";
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
    <Field className={fieldState.invalid ? "invalid-field gap-2 text-destructive" : "gap-2"}>
      <FieldLabel htmlFor={name}>Date of birth</FieldLabel>

      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            id={name}
            ref={inputRef}
            type="button"
            variant="outline"
            className="field-control h-11 w-full justify-start gap-3 rounded-lg border-input px-3.5 font-normal shadow-none"
          >
            <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
            {value ? format(parseISO(value), "MMMM d, yyyy") : <span className="text-muted-foreground">Choose your birthday</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
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
      <p className="text-xs text-muted-foreground">You must be 13 or older to join.</p>
    </Field>
  );
};

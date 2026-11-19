"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { FormItem } from "@/components/register/form/FormItem";
import { Label as FormLabel } from "@/components/ui/label";
import { Slot as FormControl } from "@radix-ui/react-slot";
import { FormMessage } from "@/components/register/form/FormMessage";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover } from "@/components/ui/popover";
import { PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@/components/ui/popover";
import { latestBirthDate } from "@/lib/validations/register.schema";

export const DateOfBirthInput: RegistrationFieldRendererType<"dateOfBirth"> = ({ field: { name, ref: inputRef, value, onChange, onBlur }, fieldState }) => {
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
    <FormItem>
      <FormLabel htmlFor={name}>Date of birth</FormLabel>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <FormControl id={name} aria-invalid={fieldState.invalid} aria-describedby={fieldState.error ? `${name}-error` : undefined}>
            <Button ref={inputRef} type="button" variant="outline" className="h-11 w-full justify-start gap-3 rounded-lg border-input px-3.5 font-normal shadow-none">
              <CalendarIcon className="size-4 shrink-0 text-slate-600" />
              {value ? format(parseISO(value), "MMMM d, yyyy") : <span className="text-slate-600">Choose your birthday</span>}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value ? parseISO(value) : undefined}
            onSelect={handleSelect}
            captionLayout="dropdown"
            defaultMonth={value ? parseISO(value) : latestBirthDate()}
            startMonth={new Date(1900, 0)}
            endMonth={latestBirthDate()}
            disabled={isDateDisabled}
            autoFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage id={`${name}-error`} message={fieldState.error?.message} />
      <p className="text-xs text-slate-600">You must be 13 or older to join.</p>
    </FormItem>
  );
};

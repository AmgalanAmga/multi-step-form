"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { FormItem } from "@/components/ui/FormItem";
import { FormLabel } from "@/components/ui/FormLabel";
import { FormControl } from "@/components/ui/FormControl";
import { FormMessage } from "@/components/ui/FormMessage";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import { Popover } from "@/components/ui/Popover";
import { PopoverTrigger } from "@/components/ui/PopoverTrigger";
import { PopoverContent } from "@/components/ui/PopoverContent";
import { latestBirthDate } from "@/lib/validations/register.schema";

export const DateOfBirthInput: RegistrationFieldRendererType<"dateOfBirth"> = ({ field: { ref: inputRef, value, onChange, onBlur } }) => {
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
      <FormLabel>Date of birth</FormLabel>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button ref={inputRef} type="button" variant="outline" className="justify-start w-full font-normal h-11">
              <CalendarIcon className="shrink-0 mr-2 size-4 text-slate-600" />
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
      <FormMessage />
      <p className="text-[11px] text-slate-600">You must be 13 or older to join.</p>
    </FormItem>
  );
};

"use client";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon, Phone } from "lucide-react";
import { useFormContext, type UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ImageUpload } from "./image-upload";
import { latestBirthDate, type RegisterValues } from "@/lib/validations/register.schema";

type StepProfileType = {
  form: UseFormReturn<RegisterValues>;
};

const PhoneNumberInput: RegistrationFieldRendererType<"phoneNumber"> = ({ field }) => {
  return (
    <FormItem>
      <FormLabel>Phone number</FormLabel>
      <div className="relative">
        <Phone className="pointer-events-none absolute left-3.5 top-3.75 size-3.75 text-muted-foreground" />
        <FormControl>
          <Input {...field} type="tel" autoComplete="tel" placeholder="+97699112233" className="pl-10" />
        </FormControl>
      </div>
      <FormMessage />
    </FormItem>
  );
};

const DateOfBirthInput: RegistrationFieldRendererType<"dateOfBirth"> = ({ field: { ref: inputRef, value, onChange, onBlur } }) => {
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
              <CalendarIcon className="mr-2 size-4 text-muted-foreground" />
              {value ? format(parseISO(value), "MMMM d, yyyy") : <span className="text-muted-foreground">Choose your birthday</span>}
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
      <p className="text-[11px] text-muted-foreground">You must be 13 or older to join.</p>
    </FormItem>
  );
};

const ProfileImageInput: RegistrationFieldRendererType<"profileImage"> = ({ field }) => {
  const form = useFormContext<RegisterValues>();

  const handleChange = (file: File | undefined) => {
    field.onChange(file);
    void form.trigger("profileImage");
  };

  return (
    <FormItem>
      <FormLabel>Profile photo</FormLabel>
      <FormControl>
        <ImageUpload value={field.value} disabled={form.formState.isSubmitting} onChange={handleChange} onBlur={field.onBlur} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export const StepProfile = ({ form }: StepProfileType) => {
  return (
    <div className="space-y-5">
      <FormField control={form.control} name="phoneNumber" component={PhoneNumberInput} />
      <FormField control={form.control} name="dateOfBirth" component={DateOfBirthInput} />
      <FormField control={form.control} name="profileImage" component={ProfileImageInput} />
    </div>
  );
};

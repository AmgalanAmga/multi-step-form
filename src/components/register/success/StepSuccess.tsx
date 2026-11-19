"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { CheckCircle2, ArrowRight, Mail, Phone, Calendar, User } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/Button";
import { SummaryRow } from "./SummaryRow";

type StepSuccessType = {
  data: RegistrationSummary;
  onReset: () => void;
};

export const StepSuccess = ({ data, onReset }: StepSuccessType) => {
  const heading = useRef<HTMLHeadingElement>(null);
  const focusSuccessHeading = () => {
    heading.current?.focus();
  };
  useEffect(focusSuccessHeading, []);

  return (
    <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="text-center">
      <div className="relative mx-auto mb-6 w-fit">
        <Image
          unoptimized
          width={96}
          height={96}
          src={data.profileImage}
          alt={`${data.firstName}'s profile`}
          className="object-cover border-4 rounded-full shadow-lg size-24 border-background"
        />
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
          className="absolute bottom-0 right-0"
        >
          <CheckCircle2 className="rounded-full size-8 bg-card text-primary" />
        </motion.span>
      </div>
      <p className="mb-2 text-xs font-semibold tracking-widest uppercase text-primary">You’re all set</p>
      <h2 ref={heading} tabIndex={-1} className="text-3xl font-semibold tracking-tight">
        Welcome, {data.firstName}.
      </h2>
      <p className="mt-3 text-sm text-muted-foreground">Your profile is ready for its next chapter.</p>
      <dl className="px-4 text-left border divide-y my-7 rounded-xl border-border bg-muted/25">
        <SummaryRow icon={User} label="Name" value={`${data.firstName} ${data.lastName}`} />
        <SummaryRow icon={Mail} label="Email" value={data.email} />
        <SummaryRow icon={Phone} label="Phone" value={data.phoneNumber} />
        <SummaryRow icon={Calendar} label="Birthday" value={format(parseISO(data.dateOfBirth), "MMMM d, yyyy")} />
      </dl>
      <Button onClick={onReset} className="w-full h-11">
        Start over
        <ArrowRight size={16} />
      </Button>
    </motion.section>
  );
};

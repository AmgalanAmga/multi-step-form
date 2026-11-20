"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SummaryRow } from "./SummaryRow";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Mail, Phone, Calendar, User } from "lucide-react";

type StepSuccessType = {
  data: RegistrationSummary;
  onReset: () => void;
};

export const StepSuccess = ({ data, onReset }: StepSuccessType) => {
  return (
    <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="text-center">
      <div className="relative mx-auto mb-6 w-fit">
        <Image
          unoptimized
          width={96}
          height={96}
          src={data.profileImage}
          alt={`${data.firstName}'s profile`}
          className="object-cover border-4 rounded-full shadow-lg size-24 border-[#49375c]"
        />
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
          className="absolute bottom-0 right-0"
        >
          <CheckCircle2 className="rounded-full size-8 bg-[#16121d] text-[#c5a6ff]" />
        </motion.span>
      </div>
      <p className="mb-2 text-xs font-semibold tracking-widest uppercase text-[#c5a6ff]">You’re all set</p>
      <h2 className="text-3xl font-semibold tracking-tight">Welcome, {data.firstName}.</h2>
      <p className="mt-3 text-sm text-[#c3b7d4]">Your profile is ready for its next chapter.</p>
      <dl className="px-4 text-left border divide-y my-7 rounded-xl border-[#49375c] bg-[#302736]/25">
        <SummaryRow icon={User} label="Name" value={`${data.firstName} ${data.lastName}`} />
        <SummaryRow icon={Mail} label="Email" value={data.email} />
        <SummaryRow icon={Phone} label="Phone" value={data.phoneNumber} />
        <SummaryRow icon={Calendar} label="Birthday" value={format(parseISO(data.dateOfBirth), "MMMM d, yyyy")} />
      </dl>
      <Button onClick={onReset} className="h-11 w-full bg-[linear-gradient(105deg,#b694ff,#e5bdff)] text-[#241332] enabled:hover:brightness-108">
        Start over
        <ArrowRight className="shrink-0" size={16} />
      </Button>
    </motion.section>
  );
};

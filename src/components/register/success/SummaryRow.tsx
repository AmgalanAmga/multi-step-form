"use client";

import type { LucideIcon } from "lucide-react";

type SummaryRowType = {
  label: string;
  value: string;
  icon: LucideIcon;
};

export const SummaryRow = ({ icon: Icon, label, value }: SummaryRowType) => {
  return (
    <div className="flex items-center gap-3 py-3">
      <Icon className="size-4 shrink-0 text-slate-600" />
      <div className="min-w-0">
        <dt className="text-[10px] text-slate-600">{label}</dt>
        <dd className="text-sm wrap-break-word">{value}</dd>
      </div>
    </div>
  );
};

import { cn } from "@/lib/utils";
import { UploadCloud } from "lucide-react";
import type { ComponentProps } from "react";

type ImageDropZoneProps = ComponentProps<"button"> & { dragging: boolean };

export const ImageDropZone = ({ dragging, ...props }: ImageDropZoneProps) => (
  <button
    {...props}
    type="button"
    className={cn(
      "field-control flex w-full cursor-pointer disabled:cursor-wait flex-col items-center rounded-xl border border-slate-200 border-dashed bg-slate-100/25 px-4 py-6 text-center hover:border-emerald-700 hover:bg-emerald-700/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700",
      dragging && "border-emerald-700 bg-emerald-700/10",
    )}
  >
    <span className="grid mb-3 rounded-full size-9 place-items-center bg-emerald-700/10 text-emerald-700">
      <UploadCloud className="shrink-0" size={18} />
    </span>

    <span className="text-xs">
      <strong className="font-semibold text-emerald-700">Click to upload</strong> or drag and drop
    </span>

    <span className="mt-1 text-xs text-slate-600">JPG, PNG or WebP · Up to 5 MB</span>
  </button>
);

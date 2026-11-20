import { cn } from "@/lib/utils";
import { UploadCloud } from "lucide-react";
import type { ComponentProps } from "react";

type ImageDropZoneProps = ComponentProps<"button"> & { dragging: boolean };

export const ImageDropZone = ({ dragging, ...props }: ImageDropZoneProps) => (
  <button
    {...props}
    type="button"
    className={cn(
      "field-control flex w-full cursor-pointer disabled:cursor-wait flex-col items-center rounded-xl border border-border border-dashed bg-muted/25 px-4 py-6 text-center hover:border-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
      dragging && "border-primary bg-primary/10",
    )}
  >
    <span className="grid mb-3 rounded-full size-9 place-items-center bg-primary/10 text-primary">
      <UploadCloud className="shrink-0" size={18} />
    </span>

    <span className="text-xs">
      <strong className="font-semibold text-primary">Click to upload</strong> or drag and drop
    </span>

    <span className="mt-1 text-xs text-muted-foreground">JPG, PNG or WebP · Up to 5 MB</span>
  </button>
);

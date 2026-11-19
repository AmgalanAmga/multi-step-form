import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";

type ImageUploadPreviewProps = {
  preview: string;
  filename?: string;
  id?: string;
  disabled?: boolean;
  onChoose: () => void;
  onRemove: () => void;
};

export const ImageUploadPreview = ({ preview, filename, onChoose, onRemove, ...buttonProps }: ImageUploadPreviewProps) => (
  <div className="flex items-center gap-4 p-4 border rounded-xl border-border bg-muted/30">
    <Image unoptimized width={64} height={64} src={preview} alt="Selected profile preview" className="object-cover rounded-full size-16" />
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium truncate">{filename}</p>
      <Button {...buttonProps} type="button" variant="link" className="h-auto p-0 text-xs" onClick={onChoose}>
        Choose another photo
      </Button>
    </div>
    <Button type="button" size="icon" variant="ghost" disabled={buttonProps.disabled} aria-label="Remove photo" onClick={onRemove}>
      <X className="shrink-0" size={16} />
    </Button>
  </div>
);

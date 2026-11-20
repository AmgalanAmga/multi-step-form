import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type ImageUploadPreviewProps = {
  id?: string;
  preview: string;
  filename?: string;
  disabled?: boolean;
  onChoose: () => void;
  onRemove: () => void;
};

export const ImageUploadPreview = ({ preview, filename, onChoose, onRemove, ...buttonProps }: ImageUploadPreviewProps) => (
  <div className="flex items-center gap-4 p-4 border rounded-[9px]! border-[#d8c1f459]! bg-[linear-gradient(165deg,#eeddff21,#7e5fa20f_52%)] bg-[#110c1861]! shadow-[inset_0_1px_0_#ffffff24]! backdrop-blur-[10px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd8aff] in-[.invalid-field]:border-[#ff92a7]! rounded-xl border-[#49375c] bg-[#302736]/30">
    <Image unoptimized width={64} height={64} src={preview} alt="Selected profile preview" className="object-cover rounded-full size-16" />

    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium truncate">{filename}</p>
      <Button {...buttonProps} type="button" variant="link" className="h-auto p-0 text-xs" onClick={onChoose}>
        Choose another photo
      </Button>
    </div>

    <Button type="button" size="icon" variant="ghost" disabled={buttonProps.disabled} title="Remove photo" onClick={onRemove}>
      <X className="shrink-0" size={16} />
    </Button>
  </div>
);

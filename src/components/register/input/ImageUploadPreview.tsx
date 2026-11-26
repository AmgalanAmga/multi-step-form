import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type ImageUploadPreviewProps = {
  id?: string;
  file: File;
  disabled?: boolean;
  onChoose: () => void;
  onRemove: () => void;
};

export const ImageUploadPreview = ({ file, onChoose, onRemove, ...buttonProps }: ImageUploadPreviewProps) => {
  const attachImage = (image: HTMLImageElement | null) => {
    if (!image) return;

    const url = URL.createObjectURL(file);
    image.src = url;
    const releaseImage = () => URL.revokeObjectURL(url);
    return releaseImage;
  };

  return (
    <div className="flex items-center gap-4 p-4 border rounded-[9px] border-[#d8c1f459] bg-[#110c1861]! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd8aff]">
      <img ref={attachImage} width={64} height={64} alt="Selected profile preview" className="object-cover rounded-full size-16" />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{file.name}</p>
        <Button {...buttonProps} type="button" variant="link" className="h-auto p-0 text-xs" onClick={onChoose}>
          Choose another photo
        </Button>
      </div>

      <Button type="button" size="icon" variant="ghost" disabled={buttonProps.disabled} title="Remove photo" onClick={onRemove}>
        <X className="shrink-0" size={16} />
      </Button>
    </div>
  );
};

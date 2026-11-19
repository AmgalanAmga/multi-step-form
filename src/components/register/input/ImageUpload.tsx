"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IMAGE_TYPES } from "@/lib/constants";
import { cn } from "@/lib/utils";
type ImageUploadType = {
  value?: File;
  disabled?: boolean;
  onChange: (file: File | undefined) => void;
  onBlur: () => void;
  id?: string;
};
export const ImageUpload = ({ value, disabled = false, onChange, onBlur, ...props }: ImageUploadType) => {
  const [preview, setPreview] = useState<string>();
  const [dragging, setDragging] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const syncImagePreview = () => {
    if (!value) {
      setPreview(undefined);
      return;
    }
    const url = URL.createObjectURL(value);
    setPreview(url);
    const revokePreview = () => {
      return URL.revokeObjectURL(url);
    };
    return revokePreview;
  };

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(syncImagePreview, [value]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    onChange(event.target.files?.[0]);
    onBlur();
    event.target.value = "";
  };
  const openFilePicker = () => {
    return input.current?.click();
  };
  const removeImage = () => {
    onChange(undefined);
    onBlur();
  };
  const handleDragOver = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = () => {
    return setDragging(false);
  };
  const handleDrop = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDragging(false);
    if (disabled) return;
    onChange(event.dataTransfer.files[0]);
    onBlur();
  };
  /* eslint-enable react-hooks/set-state-in-effect */
  return (
    <div>
      <input ref={input} type="file" disabled={disabled} accept={IMAGE_TYPES.join(",")} className="sr-only" tabIndex={-1} onChange={handleFileChange} />
      {preview ? (
        <div className="flex items-center gap-4 p-4 border rounded-xl border-border bg-muted/30">
          <Image unoptimized width={64} height={64} src={preview} alt="Selected profile preview" className="object-cover rounded-full size-16" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{value?.name}</p>
            <Button {...props} type="button" variant="link" className="h-auto p-0 text-xs" onClick={openFilePicker}>
              Choose another photo
            </Button>
          </div>
          <Button type="button" size="icon" variant="ghost" onClick={removeImage}>
            <X size={16} />
          </Button>
        </div>
      ) : (
        <button
          {...props}
          type="button"
          className={cn(
            "flex w-full flex-col items-center rounded-xl border border-border border-dashed bg-muted/25 px-4 py-6 text-center hover:border-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            dragging && "border-primary bg-primary/10",
          )}
          onClick={openFilePicker}
          onBlur={onBlur}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <span className="grid mb-3 rounded-full size-9 place-items-center bg-primary/10 text-primary">
            <UploadCloud size={18} />
          </span>
          
          <span className="text-xs">
            <strong className="font-semibold text-primary">Click to upload</strong> or drag and drop
          </span>
          <span className="mt-1 text-[10px] text-muted-foreground">JPG, PNG or WebP · Up to 5 MB</span>
        </button>
      )}
    </div>
  );
};

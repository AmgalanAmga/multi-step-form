"use client";

import { IMAGE_TYPES } from "@/constants";
import { UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ImageUploadPreview } from "./ImageUploadPreview";

type ImageUploadProps = {
  id?: string;
  value?: File;
  disabled?: boolean;
  onBlur: () => void;
  onChange: (file: File | undefined) => void;
};

export const ImageUpload = ({ value, disabled = false, onChange, onBlur, ...buttonProps }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string>();
  const input = useRef<HTMLInputElement>(null);

  const syncImagePreview = () => {
    if (!value) {
      setPreview(undefined);
      return;
    }
    const url = URL.createObjectURL(value);
    setPreview(url);
    const cleanup = () => URL.revokeObjectURL(url);
    return cleanup;
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(syncImagePreview, [value]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.files?.[0]);
    onBlur();
    event.target.value = "";
  };

  const openFilePicker = () => {
    input.current?.click();
  };

  const removeImage = () => {
    onChange(undefined);
    onBlur();
  };

  return (
    <div>
      <input ref={input} type="file" disabled={disabled} accept={IMAGE_TYPES.join(",")} hidden onChange={handleFileChange} />
      {preview ? (
        <ImageUploadPreview {...buttonProps} preview={preview} filename={value?.name} disabled={disabled} onChoose={openFilePicker} onRemove={removeImage} />
      ) : (
        <button
          {...buttonProps}
          disabled={disabled}
          onBlur={onBlur}
          onClick={openFilePicker}
          type="button"
          className="rounded-[9px] border-[#d8c1f459] bg-[#110c1861]! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd8aff] flex w-full cursor-pointer disabled:cursor-wait flex-col items-center border border-dashed px-4 py-6 text-center hover:border-[#c5a6ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a6ff]"
        >
          <span className="grid mb-3 rounded-full size-9 place-items-center bg-[#c5a6ff]/10 text-[#c5a6ff]">
            <UploadCloud className="shrink-0" size={18} />
          </span>

          <span className="text-xs">
            <strong className="font-semibold text-[#c5a6ff]">Choose a photo</strong>
          </span>

          <span className="mt-1 text-xs text-[#c3b7d4]">JPG, PNG or WebP · Up to 5 MB</span>
        </button>
      )}
    </div>
  );
};

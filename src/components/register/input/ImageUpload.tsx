"use client";

import { IMAGE_TYPES } from "@/lib/constants";
import { ImageDropZone } from "./ImageDropZone";
import { ImageUploadPreview } from "./ImageUploadPreview";
import { useImageUpload, type ImageUploadOptions } from "@/hooks/useImageUpload";

type ImageUploadProps = ImageUploadOptions & { id?: string };

export const ImageUpload = ({ value, disabled = false, onChange, onBlur, ...buttonProps }: ImageUploadProps) => {
  const { input, preview, dragging, openFilePicker, removeImage, handleFileChange, handleDragOver, handleDragLeave, handleDrop } = useImageUpload({
    value,
    onBlur,
    disabled,
    onChange,
  });

  return (
    <div>
      <input ref={input} type="file" disabled={disabled} accept={IMAGE_TYPES.join(",")} hidden onChange={handleFileChange} />
      {preview ? (
        <ImageUploadPreview {...buttonProps} preview={preview} filename={value?.name} disabled={disabled} onChoose={openFilePicker} onRemove={removeImage} />
      ) : (
        <ImageDropZone
          {...buttonProps}
          onBlur={onBlur}
          dragging={dragging}
          disabled={disabled}
          onDrop={handleDrop}
          onClick={openFilePicker}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        />
      )}
    </div>
  );
};

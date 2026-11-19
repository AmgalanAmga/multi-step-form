"use client";

import { IMAGE_TYPES } from "@/lib/constants";
import { ImageDropZone } from "./ImageDropZone";
import { ImageUploadPreview } from "./ImageUploadPreview";
import { useImageUpload, type ImageUploadOptions } from "@/hooks/useImageUpload";

type ImageUploadProps = ImageUploadOptions & { id?: string };

export const ImageUpload = ({ value, disabled = false, onChange, onBlur, ...buttonProps }: ImageUploadProps) => {
  const {
    input, preview, dragging, openFilePicker, removeImage,
    handleFileChange, handleDragOver, handleDragLeave, handleDrop,
  } = useImageUpload({ value, disabled, onChange, onBlur });

  return (
    <div>
      <input
        ref={input}
        type="file"
        disabled={disabled}
        accept={IMAGE_TYPES.join(",")}
        className="sr-only"
        tabIndex={-1}
        onChange={handleFileChange}
      />
      {preview ? (
        <ImageUploadPreview
          {...buttonProps}
          preview={preview}
          filename={value?.name}
          disabled={disabled}
          onChoose={openFilePicker}
          onRemove={removeImage}
        />
      ) : (
        <ImageDropZone
          {...buttonProps}
          dragging={dragging}
          disabled={disabled}
          onClick={openFilePicker}
          onBlur={onBlur}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        />
      )}
    </div>
  );
};

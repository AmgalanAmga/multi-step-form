import { useEffect, useRef, useState } from "react";

export type ImageUploadOptions = {
  value?: File;
  disabled?: boolean;
  onChange: (file: File | undefined) => void;
  onBlur: () => void;
};

export const useImageUpload = ({ value, disabled, onChange, onBlur }: ImageUploadOptions) => {
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

  // eslint-disable-next-line react-hooks/set-state-in-effect
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

  return { preview, dragging, input, handleFileChange, openFilePicker, removeImage, handleDragOver, handleDragLeave, handleDrop };
};

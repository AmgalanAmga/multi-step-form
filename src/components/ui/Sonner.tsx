"use client";
import { Toaster as Sonner, type ToasterProps } from "sonner";
type ToasterType = ToasterProps;
export const Toaster = (props: ToasterType) => {
  return <Sonner {...props} theme="light" />;
};

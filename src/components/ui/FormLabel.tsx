"use client";

import { useContext, type ComponentProps } from "react";
import { Label } from "./Label";
import { ItemContext } from "./form-context";

type FormLabelType = ComponentProps<typeof Label>;

export const FormLabel = (props: FormLabelType) => {
  const { id } = useContext(ItemContext);
  return <Label htmlFor={`${id}-input`} {...props} />;
};

"use client";

import { useContext, type ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { ItemContext } from "./form-context";

type FormControlType = ComponentProps<typeof Slot>;

export const FormControl = (props: FormControlType) => {
  const { id } = useContext(ItemContext);
  return <Slot id={`${id}-input`} {...props} />;
};

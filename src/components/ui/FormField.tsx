"use client";

import { type ComponentType } from "react";
import { useController, type ControllerProps, type FieldPath, type FieldValues } from "react-hook-form";
import { FieldContext } from "./form-context";

type FormFieldType<T extends FieldValues, N extends FieldPath<T>> = Omit<
  ControllerProps<T, N>,
  "render"
> & {
  component: ComponentType<Parameters<ControllerProps<T, N>["render"]>[0]>;
};

export const FormField = <T extends FieldValues, N extends FieldPath<T>>({
  component: Component,
  ...props
}: FormFieldType<T, N>) => {
  const controller = useController(props);
  return (
    <FieldContext.Provider value={{ name: props.name }}>
      <Component {...controller} />
    </FieldContext.Provider>
  );
};

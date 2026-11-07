"use client";
import { MotionPanel } from "./motion";
import {
  createContext,
  useContext,
  useId,
  type ComponentProps,
  type ComponentType,
} from "react";
import {
  useController,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Slot } from "@radix-ui/react-slot";
import { AlertCircle } from "lucide-react";
import { Label } from "./label";
import { cn } from "@/lib/utils";
export const Form = FormProvider;
const FieldContext = createContext({ name: "" });
const ItemContext = createContext({ id: "" });
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
type FormItemType = ComponentProps<"div">;
export const FormItem = ({ className, ...props }: FormItemType) => {
  const id = useId();
  return (
    <ItemContext.Provider value={{ id }}>
      <div className={cn("space-y-2", className)} {...props} />
    </ItemContext.Provider>
  );
};
type FormLabelType = ComponentProps<typeof Label>;
export const FormLabel = (props: FormLabelType) => {
  const { id } = useContext(ItemContext);
  return <Label htmlFor={`${id}-input`} {...props} />;
};
type FormControlType = ComponentProps<typeof Slot>;
export const FormControl = (props: FormControlType) => {
  const { id } = useContext(ItemContext);
  return <Slot id={`${id}-input`} {...props} />;
};
type FormMessageType = ComponentProps<"p">;
export const FormMessage = ({ className, ...props }: FormMessageType) => {
  const { id } = useContext(ItemContext);
  const { name } = useContext(FieldContext);
  const { getFieldState, formState } = useFormContext();
  const { error } = getFieldState(name, formState);
  if (!error) return null;
  return (
    <MotionPanel>
      <p
        id={`${id}-message`}
        role="alert"
        className={cn(
          "flex items-start gap-1.5 text-[11px] text-destructive",
          className,
        )}
        {...props}
      >
        <AlertCircle className="mt-0.5 size-3 shrink-0" />
        {String(error.message ?? "")}
      </p>
    </MotionPanel>
  );
};

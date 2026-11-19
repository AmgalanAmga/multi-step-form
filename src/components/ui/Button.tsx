import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
export const buttonVariants = cva(
  "inline-flex cursor-pointer disabled:cursor-wait items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-emerald-700 text-white shadow-sm hover:bg-emerald-700/90",
        outline:
          "border border-slate-200 border-slate-400 bg-green-50 hover:bg-emerald-100",
        ghost: "hover:bg-emerald-100",
        link: "text-emerald-700 underline-offset-4 hover:underline",
      },
      size: { default: "h-10 px-4 py-2", sm: "h-9 px-3", icon: "size-10" },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);
type ButtonType = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };
export const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonType) => {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

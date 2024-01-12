import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@lib/utils";

const buttonVariants = cva(
  "inline-flex tracking-wider items-center justify-center rounded-none text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background rounded-none",
  {
    variants: {
      variant: {
        default: "bg-primaryDark text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-primaryRed text-destructive-foreground hover:bg-primaryRed-800",
        outline:
          "border border-primaryLightBorder bg-red hover:bg-primaryLightBorder hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "bg-none h-auto py-0 px-0 underline-offset-4 hover:underline text-primary",
        "outline-red":
          "border border-primaryRed-700 text-primaryRed-700 hover:bg-primaryRed-700 hover:text-white",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        xs: "h-5 px-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

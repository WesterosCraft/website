import { cn } from "@lib/utils";
import React from "react";
import { type VariantProps, cva } from "class-variance-authority";

const indicatorVariants = cva("rounded-full h-4 w-4", {
  variants: {
    variant: {
      default: "bg-primaryDark",
      inProgress: "bg-brand-orange",
      completed: "bg-brand-teal",
      notStarted: "bg-brand-navy_gray",
      abandoned: "bg-brand-red",
      redoInProgress: "bg-brand-olive_green",
    },
    size: {
      default: "h-4 w-4",
      sm: "h-3 w-3",
      lg: "h-5 w-5",
      xs: "h-2 w-2",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface LocationIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof indicatorVariants> {
  status?: string;
}

function getVariant(stat?: typeof status) {
  if (stat === "notStarted" || stat === "Not Started") {
    return "notStarted";
  }

  if (stat === "completed" || stat === "Completed") {
    return "completed";
  }

  if (stat === "inProgress" || stat === "In Progress") {
    return "inProgress";
  }

  if (stat === "redoInProgress" || stat === "Redo In Progress") {
    return "redoInProgress";
  }

  if (stat === "abandoned" || stat === "Abandoned") {
    return "abandoned";
  }

  return "default";
}

export function LocationIndicator({
  status,
  variant,
  size,
  className,
}: LocationIndicatorProps) {
  return (
    <div
      className={cn(
        indicatorVariants({
          variant: variant || getVariant(status),
          size,
          className,
        })
      )}
    ></div>
  );
}

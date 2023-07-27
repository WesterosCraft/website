import * as React from "react";

interface HeadingProps {
  children?: React.ReactNode;
  className?: string;
}

export function TypographyH1({ children, className }: HeadingProps) {
  return (
    <h1
      className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({ children, className }: HeadingProps) {
  return (
    <h2
      className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ${className}`}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ children, className }: HeadingProps) {
  return (
    <h3
      className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({ children, className }: HeadingProps) {
  return (
    <h4
      className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </h4>
  );
}

export function TypographyP({ children, className }: HeadingProps) {
  return (
    <p className={`${className} leading-7 [&:not(:first-child)]:mt-6`}>
      {children}
    </p>
  );
}

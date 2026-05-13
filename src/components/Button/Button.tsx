import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "number" | "operator" | "utility" | "equal";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

export function Button({ children, variant = "number", className = "", ...props }: ButtonProps) {
  const classes = ["calculator-button", `calculator-button--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  );
}


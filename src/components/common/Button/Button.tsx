import { type ButtonHTMLAttributes, type ReactNode } from "react";
import styles from "./Buttton.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

export function Button({
  children,
  variant = "primary",
  ...buttonProps
}: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...buttonProps}>
      {children}
    </button>
  );
}

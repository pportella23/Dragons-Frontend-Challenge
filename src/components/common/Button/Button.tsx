import React, { type ButtonHTMLAttributes, type ReactNode } from "react";
import styles from "./Buttton.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...buttonProps
}) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...buttonProps}>
      {children}
    </button>
  );
};

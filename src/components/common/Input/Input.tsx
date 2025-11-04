import { type InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
export function Input({ label, id, ...inputProps }: InputProps) {
  const inputId =
    id || (label ? label.toLowerCase().replace(/\s/g, "-") : undefined);

  return (
    <div className={styles.inputContainer}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input id={inputId} className={styles.input} {...inputProps} />
    </div>
  );
}

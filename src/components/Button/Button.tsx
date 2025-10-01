import React from "react";
import { cn } from "../../utils/formatters";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  as = "button",
  href,
  target,
  rel,
  onClick,
  disabled,
  type = "button",
  ...props
}) => {
  const buttonClass = cn(
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    className
  );

  if (as === "a") {
    return (
      <a
        href={href}
        className={buttonClass}
        target={target}
        rel={rel}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

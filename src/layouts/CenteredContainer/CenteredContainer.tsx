import React from "react";
import { cn } from "../../utils/formatters";
import styles from "./CenteredContainer.module.css";

interface CenteredContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "none";
  padding?: "none" | "sm" | "md" | "lg";
}

const CenteredContainer: React.FC<CenteredContainerProps> = ({
  children,
  className,
  maxWidth = "md",
  padding = "lg",
}) => {
  const containerClass = cn(
    styles.container,
    maxWidth !== "none" && styles[`maxWidth-${maxWidth}`],
    styles[`padding-${padding}`],
    className
  );

  return <div className={containerClass}>{children}</div>;
};

export { CenteredContainer };

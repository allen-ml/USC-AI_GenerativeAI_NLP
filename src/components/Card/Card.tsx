import React from "react";
import { cn } from "../../utils/formatters";
import styles from "./Card.module.css";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "dark" | "glass";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = "default",
  padding = "lg",
  hover = true,
}) => {
  const cardClass = cn(
    styles.card,
    styles[`variant-${variant}`],
    styles[`padding-${padding}`],
    hover && styles.hover,
    className
  );

  return <div className={cardClass}>{children}</div>;
};

export default Card;

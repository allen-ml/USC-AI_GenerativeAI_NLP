import React from "react";
import { cn } from "../../utils/formatters";
import styles from "./FullHeightSection.module.css";

interface FullHeightSectionProps {
  children: React.ReactNode;
  className?: string;
  justifyContent?:
    | "start"
    | "center"
    | "end"
    | "space-between"
    | "space-around";
  alignItems?: "start" | "center" | "end" | "stretch";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  id?: string;
}

const FullHeightSection: React.FC<FullHeightSectionProps> = ({
  children,
  className,
  justifyContent = "end",
  alignItems = "start",
  padding = "xl",
  id,
}) => {
  const containerClass = cn(
    styles.container,
    styles[`justify-${justifyContent}`],
    styles[`align-${alignItems}`],
    styles[`padding-${padding}`],
    className
  );

  return (
    <section id={id} className={containerClass}>
      {children}
    </section>
  );
};

export default FullHeightSection;

import React from "react";
import { useScrollContext } from "../../hooks/ScrollContext";
import styles from "./ScrollIndicator.module.css";

interface ScrollIndicatorProps {
  targetId: string;
  className?: string;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  targetId,
  className,
}) => {
  const { scrollToSection } = useScrollContext();

  const handleClick = () => {
    scrollToSection(targetId);
  };

  return (
    <div
      className={`${styles.scrollIndicator} ${className || ""}`}
      onClick={handleClick}
    >
      <svg
        className={styles.arrowDown}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7"
        />
      </svg>
    </div>
  );
};

export { ScrollIndicator };

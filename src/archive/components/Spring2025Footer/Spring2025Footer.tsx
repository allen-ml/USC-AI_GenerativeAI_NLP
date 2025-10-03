import React from "react";
import styles from "./Spring2025Footer.module.css";

interface Spring2025FooterProps {
  year?: number;
  courseName?: string;
}

const Spring2025Footer: React.FC<Spring2025FooterProps> = ({
  year = 2025,
  courseName = "TAC-459",
}) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>
          &copy; {year} {courseName}, University of Southern California
        </p>
      </div>
    </footer>
  );
};

export { Spring2025Footer };

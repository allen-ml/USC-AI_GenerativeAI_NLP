import { useEffect, useRef } from "react";
import styles from "./Credits.module.css";

const Credits: React.FC = () => {
  const githubLogoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (githubLogoRef.current && window.innerWidth > 768) {
        const rect = githubLogoRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        githubLogoRef.current.style.setProperty("--mouse-x", `${x}%`);
        githubLogoRef.current.style.setProperty("--mouse-y", `${y}%`);
      }
    };

    const logoElement = githubLogoRef.current;
    if (logoElement) {
      logoElement.addEventListener("mousemove", handleMouseMove);
      return () => {
        logoElement.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <div className={styles.creditsContainer}>
      <div className={styles.contentSection}>
        <div className={styles.nameSection}>
          <h1 className={styles.nameTitle}>Arvin Duh</h1>
          <p className={styles.roleDescription}>
            Course Assistant
            <br />
            Fall 2025
          </p>
        </div>
      </div>

      <div className={styles.githubSection}>
        <a
          href="https://github.com/arvinduh"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            ref={githubLogoRef}
            src="/github-mark-white.svg"
            alt="GitHub Profile"
            className={styles.githubLogo}
          />
        </a>
      </div>
    </div>
  );
};

export { Credits };

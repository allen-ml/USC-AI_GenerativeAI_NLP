import { useEffect, useRef } from 'react';
import { publicUrl } from '../../utils/config';
import styles from './Credits.module.css';

const Credits: React.FC = () => {
  const githubLogoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const logoElement = githubLogoRef.current;
    if (!logoElement) return;

    // Check once whether we're on desktop; update only on viewport change
    const mediaQuery = window.matchMedia('(min-width: 769px)');
    let isDesktop = mediaQuery.matches;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDesktop) return;
      const rect = logoElement.getBoundingClientRect();
      logoElement.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
      logoElement.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
    };

    const handleMediaChange = (e: MediaQueryListEvent) => { isDesktop = e.matches; };

    logoElement.addEventListener('mousemove', handleMouseMove);
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      logoElement.removeEventListener('mousemove', handleMouseMove);
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
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
        <a href="https://github.com/arvinduh" target="_blank" rel="noopener noreferrer">
          <img
            ref={githubLogoRef}
            src={publicUrl("/github-mark-white.svg")}
            alt="GitHub Profile"
            className={styles.githubLogo}
          />
        </a>
      </div>
    </div>
  );
};

export { Credits };

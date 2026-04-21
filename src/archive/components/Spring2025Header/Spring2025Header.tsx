import React, { useEffect, useRef, useState } from "react";
import type { Spring2025NavigationFormat } from "../../types/ContentTypes";
import styles from "./Spring2025Header.module.css";

interface Spring2025HeaderProps {
  navigationData: Spring2025NavigationFormat;
  title: string;
  subtitle: string;
}

const Spring2025Header: React.FC<Spring2025HeaderProps> = ({
  navigationData,
  title,
  subtitle,
}) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <img
              src={navigationData.logoImage}
              alt="USC Logo"
              className={styles.logo}
            />
            <h1>{title}</h1>
          </div>
          <p>{subtitle}</p>
        </div>
      </header>
      <nav className={styles.navbars} ref={navRef}>
        <ul>
          {navigationData.mainNavigation.map((item, index) => (
            <li key={index}>
              <a href={item.href}>{item.text}</a>
            </li>
          ))}
          {navigationData.dropdownNavigation.map((dropdown, index) => (
            <li key={index} className={styles.dropdownItem}>
              <button
                className={styles.dropdownToggle}
                onClick={() =>
                  setOpenDropdown(openDropdown === index ? null : index)
                }
                aria-expanded={openDropdown === index}
              >
                {dropdown.text} ▾
              </button>
              {openDropdown === index && (
                <ul className={styles.dropdownMenu}>
                  {dropdown.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        className={styles.dropdownLink}
                        href={link.href}
                        onClick={() => setOpenDropdown(null)}
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export { Spring2025Header };

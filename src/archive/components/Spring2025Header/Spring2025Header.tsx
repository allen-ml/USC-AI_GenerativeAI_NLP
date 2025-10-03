import React from "react";
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
      <nav className={styles.navbars}>
        <ul>
          {navigationData.mainNavigation.map((item, index) => (
            <li key={index}>
              <a href={item.href}>{item.text}</a>
            </li>
          ))}
          {navigationData.dropdownNavigation.map((dropdown, index) => (
            <li key={index} className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id={`dropdown${index}`}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {dropdown.text}
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby={`dropdown${index}`}
              >
                {dropdown.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="dropdown-list">
                    <a className="dropdown-item" href={link.href}>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export { Spring2025Header };

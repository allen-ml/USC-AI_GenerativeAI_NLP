import React, { useEffect } from "react";
import { Spring2025Footer } from "../../components/Spring2025Footer/Spring2025Footer";
import { Spring2025Header } from "../../components/Spring2025Header/Spring2025Header";
import spring2025Navigation from "../../content/spring-2025-navigation.json";
import spring2025Data from "../../content/spring-2025.json";
import type {
  Spring2025ContentFormat,
  Spring2025NavigationFormat,
} from "../../types/ContentTypes";
import styles from "./Spring2025Layout.module.css";

interface Spring2025LayoutProps {
  children: React.ReactNode;
}

export const Spring2025Layout: React.FC<Spring2025LayoutProps> = ({
  children,
}) => {
  const data = spring2025Data as Spring2025ContentFormat;
  const navigationData = spring2025Navigation as Spring2025NavigationFormat;
  const subtitle = `${data.descriptors.term} | ${data.descriptors.time} | Location: ${data.descriptors.location}`;

  useEffect(() => {
    // Load Bootstrap CSS
    const bootstrapCSS = document.createElement("link");
    bootstrapCSS.href =
      "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css";
    bootstrapCSS.rel = "stylesheet";
    document.head.appendChild(bootstrapCSS);

    // Load Bootstrap JS
    const bootstrapJS = document.createElement("script");
    bootstrapJS.src =
      "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js";
    document.head.appendChild(bootstrapJS);

    // Cleanup function
    return () => {
      document.head.removeChild(bootstrapCSS);
      document.head.removeChild(bootstrapJS);
    };
  }, []);

  return (
    <div className={styles.spring2025Layout}>
      <Spring2025Header
        navigationData={navigationData}
        title={data.title}
        subtitle={subtitle}
      />
      <main className={styles.mainContent}>{children}</main>
      <Spring2025Footer />
    </div>
  );
};

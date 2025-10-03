import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ArchiveNavigation.module.css";

interface ArchiveNavigationProps {
  semester: "spring-2025" | "fall-2024" | "spring-2024";
  currentPage?: "home" | "projects";
}

const ArchiveNavigation: React.FC<ArchiveNavigationProps> = ({
  semester,
  currentPage: _currentPage = "home",
}) => {
  // _currentPage can be used in the future to highlight active navigation items
  const [showPreviousSemesters, setShowPreviousSemesters] = useState(false);
  const [showFinalProjects, setShowFinalProjects] = useState(false);

  const getSemesterInfo = () => {
    switch (semester) {
      case "spring-2025":
        return {
          title: "TAC-459: Generative AI and Natural Language Processing",
          subtitle:
            "Spring 2025 | Mondays 5:00 PM - 8:20 PM | Location: KAP 160",
          homeLink: "/archive/spring-2025",
        };
      case "fall-2024":
        return {
          title: "TAC-459: Generative AI and Natural Language Processing",
          subtitle: "Fall 2024 | Mondays 5:00 PM - 8:20 PM | Location: KAP 160",
          homeLink: "/archive/fall-2024",
        };
      case "spring-2024":
        return {
          title: "TAC-459: Generative AI and Natural Language Processing",
          subtitle:
            "Spring 2024 | Mondays 5:00 PM - 8:20 PM | Location: KAP 160",
          homeLink: "/archive/spring-2024",
        };
    }
  };

  const semesterInfo = getSemesterInfo();

  return (
    <>
      {/* USC Header */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <img
              src="/archive/Shield_RegUse_Wh_RGB.png"
              alt="USC Logo"
              className={styles.logo}
            />
            <h1>{semesterInfo.title}</h1>
          </div>
          <p>{semesterInfo.subtitle}</p>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className={styles.navbars}>
        <ul>
          <li>
            <Link
              to={
                semester === "spring-2025"
                  ? "/archive/spring-2025#overview"
                  : `${semesterInfo.homeLink}#overview`
              }
              onClick={(e) => {
                if (semester === "spring-2025") {
                  e.preventDefault();
                  window.location.href = "/archive/spring-2025#overview";
                }
              }}
            >
              Overview
            </Link>
          </li>
          <li>
            <Link
              to={
                semester === "spring-2025"
                  ? "/archive/spring-2025#contacts"
                  : `${semesterInfo.homeLink}#contacts`
              }
              onClick={(e) => {
                if (semester === "spring-2025") {
                  e.preventDefault();
                  window.location.href = "/archive/spring-2025#contacts";
                }
              }}
            >
              Instructors
            </Link>
          </li>
          <li>
            <Link
              to={
                semester === "spring-2025"
                  ? "/archive/spring-2025#schedule"
                  : `${semesterInfo.homeLink}#schedule`
              }
              onClick={(e) => {
                if (semester === "spring-2025") {
                  e.preventDefault();
                  window.location.href = "/archive/spring-2025#schedule";
                }
              }}
            >
              Schedule
            </Link>
          </li>
          <li
            className={styles.dropdown}
            onMouseEnter={() => setShowPreviousSemesters(true)}
            onMouseLeave={() => setShowPreviousSemesters(false)}
          >
            <a href="#" className={styles.dropdownToggle}>
              Previous Semesters
            </a>
            {showPreviousSemesters && (
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link to="/archive/fall-2024">Fall 2024</Link>
                </li>
                <li>
                  <Link to="/archive/spring-2024">Spring 2024</Link>
                </li>
                <li>
                  <Link to="/archive/spring-2025">Spring 2025</Link>
                </li>
              </ul>
            )}
          </li>
          <li
            className={styles.dropdown}
            onMouseEnter={() => setShowFinalProjects(true)}
            onMouseLeave={() => setShowFinalProjects(false)}
          >
            <a href="#" className={styles.dropdownToggle}>
              GenAI Final Projects
            </a>
            {showFinalProjects && (
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link to="/archive/fall-2024/projects">Fall 2024</Link>
                </li>
                <li>
                  <Link to="/archive/spring-2024/projects">Spring 2024</Link>
                </li>
                <li>
                  <Link to="/archive/spring-2025/projects">Spring 2025</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export { ArchiveNavigation };

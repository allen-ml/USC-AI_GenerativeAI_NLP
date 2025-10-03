import React from "react";
import ArchiveNavigation from "../../../components/Archive/ArchiveNavigation";
import { ClassPhotoSection } from "../../../components/Archive/ClassPhotoSection";
import styles from "../Projects.module.css";

const Spring2025Projects: React.FC = () => {
  return (
    <div className={styles.projectBody}>
      <ArchiveNavigation semester="spring-2025" currentPage="projects" />
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <h1>Spring 2025 Final Projects</h1>
          <p>TAC-459: Generative AI and Natural Language Processing</p>
        </div>

        <div className={styles.projectGrid}>
          {/* Project placeholders for Spring 2025 */}
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} className={styles.projectCard}>
              <img
                src="/archive/tbp.png"
                alt="To be published"
                className={styles.projectImage}
              />
              <h3>To be Published in May 2025</h3>
              <p>
                <strong>Description:</strong> Project details will be published
                after the Spring 2025 semester concludes.
              </p>
              <p>
                <strong>Team Members:</strong> TBD
              </p>
            </div>
          ))}
        </div>

        <ClassPhotoSection
          semester="Spring"
          year="2025"
          photoSrc="/archive/Spring2025/class_photo.jpg"
          showPlaceholder={true}
        />
      </div>
    </div>
  );
};

export default Spring2025Projects;

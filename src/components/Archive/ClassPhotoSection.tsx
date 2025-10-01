import React from "react";
import styles from "./ClassPhotoSection.module.css";

interface ClassPhotoSectionProps {
  semester: string;
  year: string;
  photoSrc: string;
  showPlaceholder?: boolean;
}

export const ClassPhotoSection: React.FC<ClassPhotoSectionProps> = ({
  semester,
  year,
  photoSrc,
  showPlaceholder = false,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.divider} />
      <div className={styles.photoSection}>
        <h2 className={styles.title}>
          TAC-459 Class of {semester} {year}
        </h2>
        {showPlaceholder ? (
          <p className={styles.placeholder}>
            Class photo will be available after the semester concludes.
          </p>
        ) : (
          <img
            src={photoSrc}
            alt={`Class Photo - ${semester} ${year}`}
            className={styles.classPhoto}
          />
        )}
      </div>
    </div>
  );
};

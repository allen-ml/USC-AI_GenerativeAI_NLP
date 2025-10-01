import React from "react";
import { ScrollIndicator, VerticalText } from "../../components";
import instructorsData from "../../content/instructors.json";
import { ScrollProvider } from "../../hooks/ScrollContext";
import { useScrollSnap } from "../../hooks/useScrollSnap";
import FullHeightSection from "../../layouts/FullHeightSection/FullHeightSection";
import styles from "./Instructors.module.css";

interface Instructor {
  Type: string;
  Name: string;
  Position: string;
  Bio: string;
  Email: string;
  Image: string;
  Profiles?: {
    [key: string]: string | undefined;
  };
}

interface InstructorCardProps {
  instructor: Instructor;
}

const InstructorCard: React.FC<InstructorCardProps> = ({ instructor }) => {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(instructor.Email);
      // You could add a toast notification here
      console.log("Email copied to clipboard");
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <div className={styles.instructorCard}>
      <div className={styles.imageContainer}>
        <img
          src={`/people/${instructor.Image}`}
          alt={instructor.Name}
          className={styles.instructorImage}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/usc-logo.png";
          }}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.nameEmailRow}>
          <h3 className={styles.name}>{instructor.Name}</h3>
          <div className={styles.emailContainer}>
            <span className={styles.email}>{instructor.Email}</span>
            <button
              onClick={copyEmail}
              className={styles.copyButton}
              title="Copy email to clipboard"
            >
              📋
            </button>
          </div>
        </div>
        <p className={styles.position}>{instructor.Position}</p>
        <p className={styles.bio}>
          {instructor.Bio.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < instructor.Bio.split("\n").length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
        {instructor.Profiles && Object.keys(instructor.Profiles).length > 0 && (
          <div className={styles.socialLinks}>
            {Object.entries(instructor.Profiles)
              .filter(([, url]) => url)
              .map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  {platform}
                </a>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Instructors: React.FC = () => {
  const instructors = instructorsData.filter(
    (person) => person.Type === "Instructor"
  );
  const courseAssistants = instructorsData.filter(
    (person) => person.Type === "Course Assistant"
  );

  const { scrollContainerRef, scrollToSection, snapToClosestSection } =
    useScrollSnap({
      threshold: 30,
      snapDuration: 800,
      maxScrollSpeed: 1000,
    });

  return (
    <ScrollProvider
      scrollToSection={scrollToSection}
      snapToClosestSection={snapToClosestSection}
    >
      <div ref={scrollContainerRef} className={styles.scrollContainer}>
        {/* Instructors Section */}
        <div data-snap-section className={styles.scrollSection}>
          <FullHeightSection
            justifyContent="center"
            alignItems="center"
            padding="xl"
            id="instructors"
          >
            <div className={styles.pageContainer}>
              <VerticalText text="INSTRUCTORS" />
              <div className={styles.mainContent}>
                <div className={styles.instructorsStack}>
                  {instructors.map((instructor, index) => (
                    <InstructorCard
                      key={index}
                      instructor={instructor as Instructor}
                    />
                  ))}
                </div>
              </div>
            </div>
            {courseAssistants.length > 0 && (
              <ScrollIndicator targetId="course-assistants" />
            )}
          </FullHeightSection>
        </div>

        {/* Course Assistants Section */}
        {courseAssistants.length > 0 && (
          <div data-snap-section className={styles.scrollSection}>
            <FullHeightSection
              justifyContent="center"
              alignItems="center"
              padding="xl"
              id="course-assistants"
            >
              <div className={styles.pageContainer}>
                <VerticalText text="ASSISTANTS" />
                <div className={styles.mainContent}>
                  <div className={styles.instructorsStack}>
                    {courseAssistants.map((assistant, index) => (
                      <InstructorCard
                        key={index}
                        instructor={assistant as Instructor}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </FullHeightSection>
          </div>
        )}
      </div>
    </ScrollProvider>
  );
};

export default Instructors;

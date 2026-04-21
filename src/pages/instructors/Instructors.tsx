import React from 'react';
import instructorsData from '../../content/instructors.json';
import { ScrollProvider } from '../../contexts/ScrollContext';
import { useScrollSnap } from '../../hooks/useScrollSnap';
import { VerticalTitleLayout } from '../../layouts/Default/Default';
import styles from './Instructors.module.css';

interface Instructor {
  Type: string;
  Name: string;
  Position: string;
  Bio: string;
  Email: string;
  Image: string;
  Profiles?: Record<string, string | undefined>;
}

const typedInstructors = instructorsData as Instructor[];

interface InstructorCardProps {
  instructor: Instructor;
}

const InstructorCard: React.FC<InstructorCardProps> = ({ instructor }) => {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(instructor.Email);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const bioLines = instructor.Bio.split('\n');

  return (
    <div className={styles.instructorCard}>
      <div className={styles.imageContainer}>
        <img
          src={`/people/${instructor.Image}`}
          alt={instructor.Name}
          className={styles.instructorImage}
          onError={(e) => { (e.target as HTMLImageElement).src = '/usc-logo.png'; }}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.nameEmailRow}>
          <h3 className={styles.name}>{instructor.Name}</h3>
          <div className={styles.emailContainer}>
            <span className={styles.email}>{instructor.Email}</span>
            <button onClick={copyEmail} className={styles.copyButton} title="Copy email to clipboard">
              📋
            </button>
          </div>
        </div>
        <p className={styles.position}>{instructor.Position}</p>
        <p className={styles.bio}>
          {bioLines.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < bioLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
        {instructor.Profiles && Object.keys(instructor.Profiles).length > 0 && (
          <div className={styles.socialLinks}>
            {Object.entries(instructor.Profiles)
              .filter(([, url]) => url)
              .map(([platform, url]) => (
                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
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
  const instructors = typedInstructors.filter((p) => p.Type === 'Instructor');
  const courseAssistants = typedInstructors.filter((p) => p.Type === 'Course Assistant');

  const { scrollContainerRef, scrollToSection, snapToClosestSection } = useScrollSnap();

  return (
    <ScrollProvider scrollToSection={scrollToSection} snapToClosestSection={snapToClosestSection}>
      <div ref={scrollContainerRef} className={styles.scrollContainer}>
        <div data-snap-section className={styles.scrollSection}>
          <VerticalTitleLayout title={['Instructors']}>
            <div className={styles.contentWrapper}>
              {instructors.map((instructor, index) => (
                <InstructorCard key={index} instructor={instructor} />
              ))}
            </div>
          </VerticalTitleLayout>
        </div>

        {courseAssistants.length > 0 && (
          <div data-snap-section className={styles.scrollSection}>
            <VerticalTitleLayout title={['Assistants']}>
              <div className={styles.contentWrapper}>
                {courseAssistants.map((assistant, index) => (
                  <InstructorCard key={index} instructor={assistant} />
                ))}
              </div>
            </VerticalTitleLayout>
          </div>
        )}
      </div>
    </ScrollProvider>
  );
};

export { Instructors };

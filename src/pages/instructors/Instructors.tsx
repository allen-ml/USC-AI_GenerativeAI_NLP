import React, { useState } from 'react';
import instructorsData from '../../content/instructors.json';
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

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface InstructorCardProps {
  instructor: Instructor;
}

const InstructorCard: React.FC<InstructorCardProps> = ({ instructor }) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(instructor.Email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing silently
    }
  };

  const bioLines = instructor.Bio.split('\n');
  const profileLinks = Object.entries(instructor.Profiles ?? {}).filter(([, url]) => url);

  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.avatarRing}>
          <img
            src={`/people/${instructor.Image}`}
            alt={instructor.Name}
            className={styles.avatar}
            onError={(e) => { (e.target as HTMLImageElement).src = '/usc-logo.png'; }}
          />
        </div>
        <div className={styles.identity}>
          <h3 className={styles.name}>{instructor.Name}</h3>
          <p className={styles.position}>{instructor.Position}</p>
        </div>
      </div>

      <div className={styles.divider} />

      <p className={styles.bio}>
        {bioLines.map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < bioLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>

      <div className={styles.footer}>
        <button
          onClick={() => { void copyEmail(); }}
          className={`${styles.emailBtn} ${copied ? styles.emailBtnCopied : ''}`}
          title={instructor.Email}
        >
          <span className={styles.emailIcon}>
            {copied ? <CheckIcon /> : <CopyIcon />}
          </span>
          <span>{copied ? 'Copied!' : instructor.Email}</span>
        </button>

        {profileLinks.length > 0 && (
          <div className={styles.profileLinks}>
            {profileLinks.map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.profileLink}
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

interface SectionProps {
  id: string;
  title: string;
  people: Instructor[];
  compact?: boolean;
}

const Section: React.FC<SectionProps> = ({ id, title, people, compact = false }) => (
  <section id={id} className={styles.section}>
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.sectionDivider} />
    </div>
    <div className={`${styles.grid} ${compact ? styles.gridCompact : ''}`}>
      {people.map((person, i) => (
        <InstructorCard key={i} instructor={person} />
      ))}
    </div>
  </section>
);

const Instructors: React.FC = () => {
  const instructors = typedInstructors.filter((p) => p.Type === 'Instructor');
  const courseAssistants = typedInstructors.filter((p) => p.Type === 'Course Assistant');

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Instructors</h1>
        <p className={styles.pageSubtitle}>Meet the team behind TAC 459</p>
      </div>

      <Section id="instructors" title="Instructors" people={instructors} />

      {courseAssistants.length > 0 && (
        <Section
          id="course-assistants"
          title="Course Assistants"
          people={courseAssistants}
          compact
        />
      )}
    </div>
  );
};

export { Instructors };

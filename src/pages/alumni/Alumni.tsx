import React from 'react';
import { allPastSemesters, type AlumniPerson, type SemesterAlumni } from '../../content/past-instructors/index';
import { publicUrl } from '../../utils/config';
import styles from './Alumni.module.css';

interface PersonCardProps {
  person: AlumniPerson;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  const linkedIn = person.Profiles?.LinkedIn;

  return (
    <div className={styles.personCard}>
      <div className={styles.avatarWrapper}>
        <img
          src={publicUrl(`/people/${person.Image}`)}
          alt={person.Name}
          className={styles.avatar}
          onError={(e) => {
            (e.target as HTMLImageElement).src = publicUrl('/usc-logo.png');
          }}
        />
      </div>
      <div className={styles.personInfo}>
        <p className={styles.personName}>{person.Name}</p>
        <p className={styles.personPosition}>{person.Position}</p>
        {linkedIn && (
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkedInLink}
          >
            LinkedIn
          </a>
        )}
      </div>
    </div>
  );
};

interface SemesterGroupProps {
  data: SemesterAlumni;
}

const SemesterGroup: React.FC<SemesterGroupProps> = ({ data }) => {
  const instructors = data.people.filter((p) => p.Type === 'Instructor');
  const assistants = data.people.filter((p) => p.Type !== 'Instructor');

  return (
    <section id={data.id} className={styles.semesterGroup}>
      <div className={styles.semesterHeader}>
        <h2 className={styles.semesterTitle}>{data.term}</h2>
        <div className={styles.semesterDivider} />
      </div>

      {instructors.length > 0 && (
        <div className={styles.roleSection}>
          <h3 className={styles.roleLabel}>Instructors</h3>
          <div className={styles.peopleGrid}>
            {instructors.map((person, i) => (
              <PersonCard key={i} person={person} />
            ))}
          </div>
        </div>
      )}

      {assistants.length > 0 && (
        <div className={styles.roleSection}>
          <h3 className={styles.roleLabel}>Course Assistants</h3>
          <div className={styles.peopleGrid}>
            {assistants.map((person, i) => (
              <PersonCard key={i} person={person} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

const Alumni: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Alumni</h1>
        <p className={styles.pageSubtitle}>
          Instructors and course assistants who have shaped this course
        </p>
      </div>

      <div className={styles.semesterList}>
        {allPastSemesters.map((semester) => (
          <SemesterGroup key={semester.id} data={semester} />
        ))}
      </div>
    </div>
  );
};

export { Alumni };

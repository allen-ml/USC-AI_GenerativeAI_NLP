import React, { useState, useEffect } from 'react';
import { allProjectSemesters, type Project, type SemesterProjects } from '../../content/projects/index';
import styles from './Projects.module.css';

interface ProjectCarouselProps {
  images: string[];
  title: string;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  if (images.length === 0) {
    return (
      <div className={styles.carouselPlaceholder}>
        <span>Images Coming Soon</span>
      </div>
    );
  }

  return (
    <div
      className={styles.carousel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`${title} — slide ${i + 1}`}
          className={`${styles.carouselImage} ${i === currentIndex ? styles.carouselImageActive : ''}`}
        />
      ))}
      {images.length > 1 && (
        <div className={styles.carouselDots}>
          {images.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ''}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface ProjectRowProps {
  project: Project;
  reverse?: boolean;
}

const ProjectRow: React.FC<ProjectRowProps> = ({ project, reverse = false }) => {
  return (
    <div className={`${styles.projectRow} ${reverse ? styles.projectRowReverse : ''}`}>
      <div className={styles.projectImageSection}>
        <ProjectCarousel images={project.images} title={project.title} />
      </div>
      <div className={styles.projectInfoSection}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        {project.description && (
          <p className={styles.projectDescription}>{project.description}</p>
        )}
        {project.executionPlan && (
          <div className={styles.infoBlock}>
            <span className={styles.infoLabel}>Tech &amp; Approach</span>
            <p className={styles.infoText}>{project.executionPlan}</p>
          </div>
        )}
        {project.teamMembers?.length > 0 && (
          <div className={styles.infoBlock}>
            <span className={styles.infoLabel}>Team</span>
            <div className={styles.memberChips}>
              {project.teamMembers.map((member, i) => (
                <span key={i} className={styles.memberChip}>
                  {member}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface SemesterSectionProps {
  data: SemesterProjects;
  isCurrent: boolean;
}

const SemesterSection: React.FC<SemesterSectionProps> = ({ data, isCurrent }) => {
  const hasProjects = data.projects?.length > 0;

  return (
    <section id={data.id} className={styles.semesterSection}>
      <div className={styles.semesterHeader}>
        {isCurrent && <span className={styles.currentBadge}>Current</span>}
        <h2 className={styles.semesterTitle}>{data.term}</h2>
        <div className={styles.semesterDivider} />
      </div>

      {hasProjects ? (
        <div className={styles.projectsList}>
          {data.projects.map((project, i) => (
            <ProjectRow key={i} project={project} reverse={i % 2 === 1} />
          ))}
        </div>
      ) : (
        <div className={styles.comingSoon}>
          <div className={styles.comingSoonInner}>
            <p className={styles.comingSoonText}>Projects coming soon</p>
            <p className={styles.comingSoonSub}>
              Student work will be showcased here at the end of the semester.
            </p>
          </div>
        </div>
      )}

      {data.classPhoto && (
        <div className={styles.classPhotoSection}>
          <h3 className={styles.classPhotoTitle}>Class Photo</h3>
          <img
            src={data.classPhoto}
            alt={`${data.term} Class Photo`}
            className={styles.classPhoto}
          />
        </div>
      )}
    </section>
  );
};

const Projects: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Projects</h1>
        <p className={styles.pageSubtitle}>
          Student final projects showcasing generative AI and NLP applications
        </p>
      </div>

      {allProjectSemesters.map((semester, i) => (
        <SemesterSection key={semester.id} data={semester} isCurrent={i === 0} />
      ))}
    </div>
  );
};

export { Projects };

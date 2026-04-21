import { normalizeToArray } from '../../utils/formatters';
import { Title } from '../../components/Title/Title';
import styles from './HeroLayout.module.css';

interface HeroLayoutProps {
  courseInfo?: string;
  tagline?: string | string[];
  title: string | string[];
  children?: React.ReactNode;
}

function HeroLayout({ courseInfo, tagline, title, children }: HeroLayoutProps): React.ReactElement {
  const taglineLines = normalizeToArray(tagline);

  return (
    <main className={styles.container}>
      <header className={styles.titleSection}>
        {courseInfo && <div className={styles.courseInfo}>{courseInfo}</div>}
        {taglineLines.length > 0 && (
          <div className={styles.tagline}>
            {taglineLines.map((line, index) => (
              <div key={index} className={styles.taglineLine}>{line}</div>
            ))}
          </div>
        )}
        <Title text={title} />
      </header>

      {children && <section className={styles.contentSection}>{children}</section>}
    </main>
  );
}

export { HeroLayout };

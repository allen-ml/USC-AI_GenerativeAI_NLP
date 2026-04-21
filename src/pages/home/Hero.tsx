import { Timeline } from '../../components/Timeline/Timeline';
import { HeroLayout } from '../../layouts/Hero/HeroLayout';
import type { TimelineItem } from '../../layouts/Timeline/TimelineLayout';
import styles from './Hero.module.css';

const quickLinks: TimelineItem[] = [
  {
    label: 'Content',
    href: '/content',
    description: 'Course materials and resources',
  },
  {
    label: 'Schedule',
    href: '/schedule',
    description: 'Class schedule and assignments',
  },
  {
    label: 'Syllabus',
    href: '/syllabus',
    description: 'Course syllabus and policies',
  },
  {
    label: 'Instructors',
    href: '/instructors',
    description: 'Meet the teaching team',
  },
];

function Hero(): React.JSX.Element {
  return (
    <HeroLayout
      courseInfo="CSCI 499 — Spring 2025"
      tagline={[
        'Capstone Course of the AI minor @USC',
        'Building Gen AI Products',
      ]}
      title={['Generative AI', '& NLP']}
    >
      <div className={styles.rightSection}>
        <Timeline items={quickLinks} />
      </div>
    </HeroLayout>
  );
}

export { Hero };

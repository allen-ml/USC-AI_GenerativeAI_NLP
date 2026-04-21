import { useState } from 'react';
import courseContent from '../../content/course_content.json';
import { DefaultLayout } from '../../layouts/Default/Default';
import type { WeekData } from '../../types/WeekData';
import { CloseButton } from './components/CloseButton/CloseButton';
import { NavigationArrow } from './components/NavigationArrow/NavigationArrow';
import { ProgressIndicator } from './components/ProgressIndicator/ProgressIndicator';
import { WeekDetailCard } from './components/WeekDetailCard/WeekDetailCard';
import { WeekListCard } from './components/WeekListCard/WeekListCard';
import styles from './Content.module.css';

const Content: React.FC = () => {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  const handlePrevious = () => {
    if (expandedWeek !== null && expandedWeek > 0) setExpandedWeek(expandedWeek - 1);
  };

  const handleNext = () => {
    if (expandedWeek !== null && expandedWeek < courseContent.length - 1) setExpandedWeek(expandedWeek + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (expandedWeek === null) return;
    if (e.key === 'ArrowLeft') handlePrevious();
    else if (e.key === 'ArrowRight') handleNext();
    else if (e.key === 'Escape') setExpandedWeek(null);
  };

  return (
    <div onKeyDown={expandedWeek !== null ? handleKeyDown : undefined} tabIndex={expandedWeek !== null ? 0 : -1}>
      {expandedWeek === null && (
        <DefaultLayout title={['Course Content']}>
          <div className={styles.container}>
            <div className={styles.weekList}>
              {(courseContent as WeekData[]).map((week, index) => (
                <WeekListCard key={week.Week} week={week} onClick={() => setExpandedWeek(index)} />
              ))}
            </div>
          </div>
        </DefaultLayout>
      )}

      {expandedWeek !== null && (
        <div className={styles.expandedView}>
          <CloseButton onClick={() => setExpandedWeek(null)} />

          {expandedWeek > 0 && (
            <NavigationArrow direction="prev" onClick={handlePrevious} ariaLabel="Previous week" />
          )}
          {expandedWeek < courseContent.length - 1 && (
            <NavigationArrow direction="next" onClick={handleNext} ariaLabel="Next week" />
          )}

          <WeekDetailCard week={courseContent[expandedWeek] as WeekData} />
          <ProgressIndicator current={expandedWeek + 1} total={courseContent.length} />
        </div>
      )}
    </div>
  );
};

export { Content };

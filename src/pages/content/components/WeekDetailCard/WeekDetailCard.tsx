import { Card } from '../../../../components/Card/Card';
import { pluralize } from '../../../../utils/formatters';
import type { WeekData } from '../../../../types/WeekData';
import styles from './WeekDetailCard.module.css';

interface WeekDetailCardProps {
  week: WeekData;
}

const WeekDetailCard: React.FC<WeekDetailCardProps> = ({ week }) => {
  return (
    <div className={styles.expandedContent}>
      <Card className={styles.expandedCard} variant="glass" padding="lg">
        <div className={styles.weekHeader}>
          <div className={styles.weekMeta}>
            <span className={styles.weekNumber}>Week {week.Week}</span>
            <span className={styles.moduleNumber}>Module {week.Module}</span>
          </div>
          {week.Deliverables.length > 0 && (
            <div className={styles.deliverablesBadge}>
              {pluralize(week.Deliverables.length, 'deliverable')}
            </div>
          )}
        </div>

        <h2 className={styles.weekTitle}>{week.Title}</h2>

        {week.Deliverables.length > 0 && (
          <div className={styles.deliverables}>
            <h3 className={styles.sectionTitle}>Deliverables</h3>
            <div className={styles.deliverablesList}>
              {week.Deliverables.map((deliverable, index) => (
                <span key={index} className={styles.deliverableTag}>{deliverable}</span>
              ))}
            </div>
          </div>
        )}

        <div className={styles.overview}>
          <h3 className={styles.sectionTitle}>Topics Covered</h3>
          <ul className={styles.topicsList}>
            {week.Overview.map((topic, index) => (
              <li key={index} className={styles.topicItem}>{topic}</li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
};

export { WeekDetailCard };

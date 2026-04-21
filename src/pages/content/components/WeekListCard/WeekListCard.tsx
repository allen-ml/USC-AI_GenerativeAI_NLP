import { Card } from '../../../../components/Card/Card';
import { pluralize } from '../../../../utils/formatters';
import type { WeekData } from '../../../../types/WeekData';
import styles from './WeekListCard.module.css';

interface WeekListCardProps {
  week: WeekData;
  onClick: () => void;
}

const WeekListCard: React.FC<WeekListCardProps> = ({ week, onClick }) => {
  return (
    <Card className={styles.weekListCard} variant="glass" padding="md" hover={true}>
      <button className={styles.weekListButton} onClick={onClick} aria-label={`View details for ${week.Title}`}>
        <div className={styles.weekListHeader}>
          <div className={styles.weekListMeta}>
            <span className={styles.weekNumber}>Week {week.Week}</span>
            <span className={styles.moduleNumber}>Module {week.Module}</span>
          </div>
          {week.Deliverables.length > 0 && (
            <div className={styles.deliverablesBadge}>
              {pluralize(week.Deliverables.length, 'deliverable')}
            </div>
          )}
        </div>
        <h2 className={styles.weekListTitle}>{week.Title}</h2>
        <p className={styles.weekListSubtitle}>{week.Overview.length} topics · Click to expand</p>
      </button>
    </Card>
  );
};

export { WeekListCard };

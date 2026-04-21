import type { TimelineItem } from '../../components/Timeline/Timeline';
import { Timeline } from '../../components/Timeline/Timeline';
import { cn } from '../../utils/formatters';
import { DefaultLayout } from '../Default/Default';
import styles from './TimelineLayout.module.css';

export type { TimelineItem };

interface TimelineLayoutProps {
  title: string[];
  items: TimelineItem[];
  className?: string;
}

function TimelineLayout({ title, items, className }: TimelineLayoutProps) {
  return (
    <DefaultLayout title={title}>
      <div className={cn(styles.rightSection, className)}>
        <Timeline items={items} />
      </div>
    </DefaultLayout>
  );
}

export { TimelineLayout };

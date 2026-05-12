import { useEffect, useRef, useState } from 'react';
import styles from './Timeline.module.css';

export interface TimelineItem {
  label: string;
  href: string;
  description?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

function Timeline({ items }: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lineStyle, setLineStyle] = useState<{ top: number; height: number }>({ top: 0, height: 0 });

  useEffect(() => {
    const calculateLinePosition = () => {
      const el = timelineRef.current;
      if (!el || dotRefs.current.length === 0) return;

      const firstDot = dotRefs.current[0];
      const lastDot = dotRefs.current[dotRefs.current.length - 1];
      if (!firstDot || !lastDot) return;

      const timelineRect = el.getBoundingClientRect();
      const firstDotRect = firstDot.getBoundingClientRect();
      const lastDotRect = lastDot.getBoundingClientRect();

      const top = firstDotRect.top - timelineRect.top + firstDotRect.height / 2;
      const bottom = lastDotRect.top - timelineRect.top + lastDotRect.height / 2;
      setLineStyle({ top, height: bottom - top });
    };

    calculateLinePosition();

    // ResizeObserver is more efficient than window resize for element-level changes
    const observer = new ResizeObserver(calculateLinePosition);
    if (timelineRef.current) observer.observe(timelineRef.current);

    return () => observer.disconnect();
  }, [items]);

  return (
    <div className={styles.timeline} ref={timelineRef}>
      {items.map((item, index) => (
        <div key={index} className={styles.timelineItem}>
          <a href={item.href} className={styles.timelineLabel}>
            <div className={styles.labelContent}>
              <span className={styles.labelText}>{item.label}</span>
              {item.description && (
                <span className={styles.labelDescription}>{item.description}</span>
              )}
            </div>
          </a>
          <div
            className={styles.timelineDot}
            ref={(el) => { dotRefs.current[index] = el; }}
          />
        </div>
      ))}
      {lineStyle.height > 0 && (
        <div
          className={styles.timelineConnector}
          style={{ top: `${lineStyle.top}px`, height: `${lineStyle.height}px` }}
        />
      )}
    </div>
  );
}

export { Timeline };

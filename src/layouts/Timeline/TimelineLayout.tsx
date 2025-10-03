import styles from "./TimelineLayout.module.css";

export interface TimelineItem {
  label: string;
  href: string;
  description?: string;
}

interface TimelineLayoutProps {
  title: string;
  items: TimelineItem[];
  className?: string;
}

const TimelineLayout: React.FC<TimelineLayoutProps> = ({
  title,
  items,
  className = "",
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {/* Left side - Title */}
      <div className={styles.leftSection}>
        <h1 className="title-hero">
          <div>{title}</div>
        </h1>
      </div>

      {/* Right side - Timeline */}
      <div className={styles.rightSection}>
        <div className={styles.timeline}>
          {/* Continuous timeline line */}
          <div className={styles.timelineLineContainer}>
            <div className={styles.timelineLine}></div>
          </div>

          {items.map((item, index) => (
            <div key={index} className={styles.timelineItem}>
              <a href={item.href} className={styles.timelineLabel}>
                <div className={styles.labelContent}>
                  <span className={styles.labelText}>{item.label}</span>
                  {item.description && (
                    <span className={styles.labelDescription}>
                      {item.description}
                    </span>
                  )}
                </div>
              </a>
              <div className={styles.timelineDot}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { TimelineLayout };

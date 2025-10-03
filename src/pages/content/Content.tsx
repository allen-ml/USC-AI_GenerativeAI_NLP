import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "../../components/Card/Card";
import courseContent from "../../content/course_content.json";
import styles from "./Content.module.css";

const Content: React.FC = () => {
  const [activeWeek, setActiveWeek] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dotNavRef = useRef<HTMLDivElement>(null);
  const weekRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Sets up an IntersectionObserver to track which week is currently visible.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = weekRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (index !== -1) {
              setActiveWeek(index);
              // We only want to set the first intersecting element as active.
              return;
            }
          }
        }
      },
      {
        root: containerRef.current,
        // The element is considered "visible" when it crosses the vertical center.
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    const currentWeekRefs = weekRefs.current;
    currentWeekRefs.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      currentWeekRefs.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  const handleWeekClick = (weekIndex: number) => {
    const weekRef = weekRefs.current[weekIndex];
    if (weekRef) {
      weekRef.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleScroll = useCallback((clientY: number) => {
    if (!containerRef.current || !dotNavRef.current) return;

    const navRect = dotNavRef.current.getBoundingClientRect();
    const scrollPercentage = (clientY - navRect.top) / navRect.height;
    const scrollableHeight =
      containerRef.current.scrollHeight - containerRef.current.clientHeight;

    containerRef.current.scrollTop = scrollableHeight * scrollPercentage;
  }, []);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleScroll(e.clientY);
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleScroll(e.touches[0].clientY);
  };

  useEffect(() => {
    const onMouseUp = () => setIsDragging(false);
    const onTouchEnd = () => setIsDragging(false);

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleScroll(e.clientY);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        handleScroll(e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDragging, handleScroll]);

  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <h1 className="heroTitle">
          <div>Course Content</div>
        </h1>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.mainContent} ref={containerRef}>
          <div className={styles.weekContainer}>
            {courseContent.map((week, index) => (
              <div
                key={week.Week}
                ref={(el) => {
                  weekRefs.current[index] = el;
                }}
                className={styles.weekSection}
              >
                <Card
                  className={`${styles.weekCard} ${
                    index === activeWeek ? styles.weekCardActive : ""
                  }`}
                  variant="glass"
                  padding="lg"
                >
                  <div className={styles.weekHeader}>
                    <div className={styles.weekMeta}>
                      <span className={styles.weekNumber}>
                        Week {week.Week}
                      </span>
                      <span className={styles.moduleNumber}>
                        Module {week.Module}
                      </span>
                    </div>
                    {week.Deliverables.length > 0 && (
                      <div className={styles.deliverablesBadge}>
                        {week.Deliverables.length} deliverable
                        {week.Deliverables.length !== 1 ? "s" : ""}
                      </div>
                    )}
                  </div>

                  <h2 className={styles.weekTitle}>{week.Title}</h2>

                  {week.Deliverables.length > 0 && (
                    <div className={styles.deliverables}>
                      <h3 className={styles.sectionTitle}>Deliverables</h3>
                      <div className={styles.deliverablesList}>
                        {week.Deliverables.map(
                          (deliverable, deliverableIndex) => (
                            <span
                              key={deliverableIndex}
                              className={styles.deliverableTag}
                            >
                              {deliverable}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  <div className={styles.overview}>
                    <h3 className={styles.sectionTitle}>Topics Covered</h3>
                    <ul className={styles.topicsList}>
                      {week.Overview.map((topic, topicIndex) => (
                        <li key={topicIndex} className={styles.topicItem}>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={dotNavRef}
          className={styles.dotNavigation}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          {courseContent.map((week, index) => (
            <button
              key={week.Week}
              className={`${styles.dotIndicator} ${
                index === activeWeek ? styles.dotActive : ""
              }`}
              onClick={() => {
                handleWeekClick(index);
              }}
              aria-label={`Go to week ${week.Week}: ${week.TitleShort}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { Content };

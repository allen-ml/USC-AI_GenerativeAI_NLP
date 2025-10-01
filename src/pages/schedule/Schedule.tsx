import { useEffect, useState } from "react";
import info from "../../content/info.json";
import CalendarView from "./CalendarView";
import styles from "./Schedule.module.css";
import WeekOverview from "./WeekOverview";

const Schedule = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleScroll = (e: React.WheelEvent) => {
    if (!isMobile) return;

    if (e.deltaY > 0 && currentPage === 0) {
      setCurrentPage(1);
    } else if (e.deltaY < 0 && currentPage === 1) {
      setCurrentPage(0);
    }
  };

  if (isMobile) {
    return (
      <div className={styles.mobileContainer} onWheel={handleScroll}>
        <div
          className={styles.mobilePages}
          style={{ transform: `translateX(-${currentPage * 100}vw)` }}
        >
          <div className={styles.mobilePage}>
            <CalendarView
              calendarId={info.calendarId}
              className={styles.mobileCalendar}
            />
          </div>
          <div className={styles.mobilePage}>
            <WeekOverview
              calendarId={info.calendarId}
              className={styles.mobileOverview}
            />
          </div>
        </div>

        <div className={styles.mobileIndicator}>
          <div
            className={`${styles.dot} ${
              currentPage === 0 ? styles.active : ""
            }`}
            onClick={() => setCurrentPage(0)}
          />
          <div
            className={`${styles.dot} ${
              currentPage === 1 ? styles.active : ""
            }`}
            onClick={() => setCurrentPage(1)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.desktopContainer}>
      <div className={styles.leftPanel}>
        <CalendarView
          calendarId={info.calendarId}
          className={styles.desktopCalendar}
        />
      </div>
      <div className={styles.rightPanel}>
        <WeekOverview
          calendarId={info.calendarId}
          className={styles.desktopOverview}
        />
      </div>
    </div>
  );
};

export default Schedule;

import { useState } from "react";
import styles from "./CalendarView.module.css";

interface CalendarViewProps {
  calendarId: string;
  className?: string;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  calendarId,
  className = "",
}) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const getWeekStart = (date: Date): Date => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day; // Sunday = 0
    start.setDate(diff);
    return start;
  };

  const getWeekEnd = (weekStart: Date): Date => {
    const end = new Date(weekStart);
    end.setDate(end.getDate() + 6);
    return end;
  };

  const navigateWeek = (direction: "prev" | "next") => {
    setCurrentWeek((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
      return newDate;
    });
  };

  const weekStart = getWeekStart(currentWeek);
  const weekEnd = getWeekEnd(weekStart);

  const formatDateRange = (start: Date, end: Date): string => {
    const startStr = start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const endStr = end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return start.getMonth() === end.getMonth()
      ? `${startStr} - ${end.getDate()}, ${end.getFullYear()}`
      : `${startStr} - ${endStr}`;
  };

  // Generate calendar embed URL
  const getCalendarEmbedUrl = (): string => {
    const baseUrl = "https://calendar.google.com/calendar/embed";
    const params = new URLSearchParams({
      src: calendarId,
      ctz: "America/Los_Angeles",
      mode: "WEEK",
      showTitle: "0",
      showNav: "1",
      showDate: "1",
      showPrint: "0",
      showTabs: "0",
      showCalendars: "0",
      showTz: "0",
      dates: `${weekStart.toISOString().split("T")[0]}/${
        weekEnd.toISOString().split("T")[0]
      }`,
    });
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className={`${styles.calendarView} ${className}`}>
      <div className={styles.header}>
        <button
          onClick={() => navigateWeek("prev")}
          className={styles.navButton}
          aria-label="Previous week"
        >
          ←
        </button>
        <h3 className={styles.weekTitle}>
          {formatDateRange(weekStart, weekEnd)}
        </h3>
        <button
          onClick={() => navigateWeek("next")}
          className={styles.navButton}
          aria-label="Next week"
        >
          →
        </button>
      </div>

      <div className={styles.calendarContainer}>
        <iframe
          src={getCalendarEmbedUrl()}
          className={styles.calendarFrame}
          title="Google Calendar"
          frameBorder="0"
          scrolling="no"
        />
      </div>
    </div>
  );
};

export default CalendarView;

import { useEffect, useState } from "react";
import info from "../../content/info.json";
import {
  GoogleCalendarService,
  type ParsedEvent,
} from "../../utils/googleCalendar";
import styles from "./WeekOverview.module.css";

interface WeekOverviewProps {
  calendarId: string;
  className?: string;
}

const WeekOverview: React.FC<WeekOverviewProps> = ({
  calendarId,
  className = "",
}) => {
  const [events, setEvents] = useState<ParsedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const calendarService = new GoogleCalendarService(
          calendarId,
          info.classKeywords
        );
        const weekEvents = await calendarService.getWeekEvents();
        setEvents(weekEvents);
      } catch (err) {
        setError("Failed to load calendar events");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [calendarId]);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getCurrentWeekRange = (): string => {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const startStr = weekStart.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const endStr = weekEnd.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return weekStart.getMonth() === weekEnd.getMonth()
      ? `${startStr} - ${weekEnd.getDate()}, ${weekEnd.getFullYear()}`
      : `${startStr} - ${endStr}`;
  };

  if (loading) {
    return (
      <div className={`${styles.weekOverview} ${className}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>This Week's Classes</h2>
          <p className={styles.dateRange}>{getCurrentWeekRange()}</p>
        </div>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.weekOverview} ${className}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>This Week's Classes</h2>
          <p className={styles.dateRange}>{getCurrentWeekRange()}</p>
        </div>
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{error}</p>
          <p className={styles.errorNote}>Showing sample data instead</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.weekOverview} ${className}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>This Week's Classes</h2>
        <p className={styles.dateRange}>{getCurrentWeekRange()}</p>
      </div>

      <div className={styles.eventsContainer}>
        {events.length === 0 ? (
          <div className={styles.noEvents}>
            <p>No info</p>
            <p className={styles.noEventsDetail}>
              No classes found for this week
            </p>
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className={`${styles.eventCard} ${styles.eventCardClass}`}
            >
              <div className={styles.eventHeader}>
                <div className={styles.eventDate}>
                  <span className={styles.dateText}>
                    {event.formattedDate} ({event.dayOfWeek})
                  </span>
                  <span className={styles.timeText}>
                    {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  </span>
                </div>
                <div className={styles.eventType}>📚 Class</div>
              </div>

              <h3 className={styles.eventTitle}>{event.title}</h3>

              {event.location && (
                <p className={styles.eventLocation}>📍 {event.location}</p>
              )}

              {event.description && (
                <div className={styles.eventDescription}>
                  <p>{event.description}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export { WeekOverview };

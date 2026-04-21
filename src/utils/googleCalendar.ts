interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
  location?: string;
}

interface CalendarResponse {
  items: CalendarEvent[];
}

export interface ParsedEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  dayOfWeek: string;
  formattedDate: string;
  eventType: "class"; // Only classes are displayed
}

const GOOGLE_CALENDAR_API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY as string;

// Utility function to extract calendar ID from shareable URL
export const extractCalendarId = (urlOrId: string): string => {
  // If it's already a calendar ID (contains @), return as is
  if (urlOrId.includes("@")) {
    return urlOrId;
  }

  // If it's a shareable URL, extract the calendar ID
  try {
    const url = new URL(urlOrId);
    const cidParam = url.searchParams.get("cid");
    if (cidParam) {
      // Decode the base64-encoded calendar ID
      return decodeURIComponent(cidParam);
    }
  } catch (error) {
    console.warn("Failed to parse calendar URL, using as-is:", error);
  }

  // Fallback: return the input as-is
  return urlOrId;
};

export class GoogleCalendarService {
  private calendarId: string;
  private classKeywords: string[];

  constructor(
    calendarIdOrUrl: string,
    classKeywords: string[] = ["class", "lecture", "course"]
  ) {
    this.calendarId = extractCalendarId(calendarIdOrUrl);
    this.classKeywords = classKeywords;
  }

  // Method to get public calendar URL for iframe embedding
  getPublicCalendarUrl(): string {
    const baseUrl = "https://calendar.google.com/calendar/embed";
    const params = new URLSearchParams({
      src: this.calendarId,
      ctz: "America/Los_Angeles",
      mode: "WEEK",
      showTitle: "0",
      showNav: "1",
      showDate: "1",
      showPrint: "0",
      showTabs: "0",
      showCalendars: "0",
      showTz: "0",
    });
    return `${baseUrl}?${params.toString()}`;
  }

  async getWeekEvents(startDate?: Date): Promise<ParsedEvent[]> {
    // This method is now an alias for getAllWeekEvents for backward compatibility
    return this.getAllWeekEvents(startDate);
  }

  private parseEvents(events: CalendarEvent[]): ParsedEvent[] {
    return events
      .map((event) => {
        const startTime = new Date(
          event.start.dateTime || event.start.date || ""
        );
        const endTime = new Date(event.end.dateTime || event.end.date || "");

        const title = event.summary || "";

        return {
          id: event.id,
          title,
          description: event.description || undefined,
          startTime,
          endTime,
          location: event.location || undefined,
          dayOfWeek: startTime.toLocaleDateString("en-US", {
            weekday: "short",
          }),
          formattedDate: startTime.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          eventType: "class" as const, // All displayed events are classes
        };
      })
      .filter((event) => {
        // Filter for class events only using the configured keywords
        const titleLower = event.title.toLowerCase();
        return this.classKeywords.some((keyword) =>
          titleLower.includes(keyword.toLowerCase())
        );
      })
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  }

  private getWeekStart(date: Date): Date {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day; // Sunday = 0
    start.setDate(diff);
    start.setHours(0, 0, 0, 0);
    return start;
  }

  private getWeekEnd(weekStart: Date): Date {
    const end = new Date(weekStart);
    end.setDate(end.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return end;
  }

  async getAllWeekEvents(startDate?: Date): Promise<ParsedEvent[]> {
    // This method returns ALL events for display
    if (!GOOGLE_CALENDAR_API_KEY) {
      console.warn(
        "Google Calendar API key not found. Calendar will show via iframe only."
      );
      return [];
    }

    try {
      const start = startDate || new Date();
      const weekStart = this.getWeekStart(start);
      const weekEnd = this.getWeekEnd(weekStart);

      const params = new URLSearchParams({
        key: GOOGLE_CALENDAR_API_KEY,
        timeMin: weekStart.toISOString(),
        timeMax: weekEnd.toISOString(),
        singleEvents: "true",
        orderBy: "startTime",
        maxResults: "50",
      });

      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        this.calendarId
      )}/events?${params}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Calendar API error: ${response.status}`);
      }

      const data = (await response.json()) as CalendarResponse;
      return this.parseEvents(data.items);
    } catch (error) {
      console.error("Error fetching calendar events:", error);
      return [];
    }
  }
}

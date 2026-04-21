export const getGoogleCalendarConfig = () => {
  return {
    apiKey: import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY as string,
    hasApiKey: !!import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY,
  };
};

export const formatCalendarUrl = (calendarId: string) => {
  const baseUrl = "https://calendar.google.com/calendar/u/0";
  const params = new URLSearchParams({
    cid: calendarId,
  });
  return `${baseUrl}?${params.toString()}`;
};

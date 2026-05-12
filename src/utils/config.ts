// Resolve a /public path against the Vite base so it works on GitHub Pages subpaths.
// Usage: publicUrl('/people/allen.jpg') → '/USC-AI_GenerativeAI_NLP/people/allen.jpg'
export const publicUrl = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

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

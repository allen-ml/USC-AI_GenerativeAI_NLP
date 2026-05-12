export function formatNumber(num: number, minDigits: number = 2): string {
  return num.toLocaleString('en-US', {
    minimumIntegerDigits: minDigits,
    useGrouping: false,
  });
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return `${count} ${count === 1 ? singular : (plural ?? `${singular}s`)}`;
}

export function normalizeToArray<T>(value: T | T[] | null | undefined): T[] {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

export function formatNumber(num: number, minDigits: number = 2): string {
  return num.toLocaleString("en-US", {
    minimumIntegerDigits: minDigits,
    useGrouping: false,
  });
}

/**
 * Utility function to conditionally join class names
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

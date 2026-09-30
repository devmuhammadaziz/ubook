export function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseISODate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

export function isMonday(iso: string) {
  return parseISODate(iso).getDay() === 1;
}

export function upcomingDates(count = 14) {
  const start = new Date();
  start.setHours(12, 0, 0, 0);
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
}

export function firstBookableISO() {
  const open = upcomingDates(10).find((date) => date.getDay() !== 1);
  return toISODate(open ?? new Date());
}

export function formatWeekday(iso: string) {
  return parseISODate(iso).toLocaleDateString("en-US", { weekday: "short" });
}

export function formatDayNumber(iso: string) {
  return parseISODate(iso).toLocaleDateString("en-US", { day: "numeric" });
}

export function formatMonth(iso: string) {
  return parseISODate(iso).toLocaleDateString("en-US", { month: "short" });
}

export function formatMedium(iso: string) {
  return parseISODate(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatLong(iso: string) {
  return parseISODate(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

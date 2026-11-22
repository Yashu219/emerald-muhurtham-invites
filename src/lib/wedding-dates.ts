// Date helpers that format in a fixed time zone without relying on the runtime's ICU data,
// so the server render and the browser always produce identical text.

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function shifted(iso: string, offsetMinutes: number) {
  return new Date(new Date(iso).getTime() + offsetMinutes * 60_000);
}

/** "Sunday, 14 February 2027" */
export function formatLongDate(iso: string, offsetMinutes: number): string {
  const d = shifted(iso, offsetMinutes);
  return `${WEEKDAYS[d.getUTCDay()]}, ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** "14 Feb 2027" */
export function formatShortDate(iso: string, offsetMinutes: number): string {
  const d = shifted(iso, offsetMinutes);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]?.slice(0, 3)} ${d.getUTCFullYear()}`;
}

/** "9:30 AM" */
export function formatTime(iso: string, offsetMinutes: number): string {
  const d = shifted(iso, offsetMinutes);
  const h24 = d.getUTCHours();
  const m = d.getUTCMinutes();
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function formatTimeRange(startIso: string, endIso: string, offsetMinutes: number): string {
  return `${formatTime(startIso, offsetMinutes)} – ${formatTime(endIso, offsetMinutes)}`;
}

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

export function getTimeLeft(targetMs: number, nowMs: number): TimeLeft {
  const diff = targetMs - nowMs;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86_400),
    hours: Math.floor((total % 86_400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    done: false,
  };
}

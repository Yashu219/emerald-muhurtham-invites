// Builders for the invitation's outbound links: calendars, maps and WhatsApp.

export type CalendarEntry = {
  title: string;
  start: string; // ISO 8601 with offset
  end: string;
  location: string;
  details: string;
};

/** 2027-02-14T09:30:00+05:30 -> 20270214T040000Z */
export function toCalendarStamp(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function googleCalendarUrl(entry: CalendarEntry): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: entry.title,
    dates: `${toCalendarStamp(entry.start)}/${toCalendarStamp(entry.end)}`,
    details: entry.details,
    location: entry.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function escapeIcs(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

export function buildIcs(entries: CalendarEntry[], uidSeed: string): string {
  const now = toCalendarStamp(new Date().toISOString());
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Wedding Invitation//EN", "CALSCALE:GREGORIAN"];
  entries.forEach((e, i) => {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${uidSeed}-${i}@wedding-invite`,
      `DTSTAMP:${now}`,
      `DTSTART:${toCalendarStamp(e.start)}`,
      `DTEND:${toCalendarStamp(e.end)}`,
      `SUMMARY:${escapeIcs(e.title)}`,
      `DESCRIPTION:${escapeIcs(e.details)}`,
      `LOCATION:${escapeIcs(e.location)}`,
      "END:VEVENT",
    );
  });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function googleMapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function googleMapsEmbedUrl(query: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

/** WhatsApp chat with a specific number. Non-digits (spaces, +, dashes) are stripped. */
export function whatsappChatUrl(phone: string, message: string): string {
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

/** WhatsApp share sheet: the user picks who to send it to. */
export function whatsappShareUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

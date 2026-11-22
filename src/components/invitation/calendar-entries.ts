import { wedding, type WeddingEvent } from "@/config/wedding";
import type { CalendarEntry } from "@/lib/wedding-links";

const couple = `${wedding.bride.name} & ${wedding.groom.name}`;

export function eventEntry(e: WeddingEvent): CalendarEntry {
  return {
    title: `${e.name} · ${couple}'s Wedding`,
    start: e.start,
    end: e.end,
    location: `${e.venue}, ${e.address}`,
    details: `${e.description}\nAttire: ${e.attire}`,
  };
}

export const muhurthamEntry: CalendarEntry = {
  title: `${couple}'s Wedding · Muhurtham`,
  start: wedding.muhurtham.start,
  end: wedding.muhurtham.end,
  location: `${wedding.venue.name}, ${wedding.venue.address}`,
  details: `${wedding.inviteLine} ${couple}.`,
};

export const allEntries: CalendarEntry[] = wedding.events.map(eventEntry);

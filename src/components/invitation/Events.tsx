import { Clock, MapPin, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { wedding } from "@/config/wedding";
import { formatLongDate, formatTimeRange } from "@/lib/wedding-dates";
import { googleMapsUrl } from "@/lib/wedding-links";
import { allEntries, eventEntry } from "./calendar-entries";
import { Reveal } from "./Effects";
import { CalendarMenu, SectionHeading } from "./Shared";

const tz = wedding.timeZoneOffsetMinutes;

export function Events() {
  return (
    <section id="events" className="relative bg-emerald-glow py-20 sm:py-28">
      <div className="absolute inset-0 bg-kolam opacity-60" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Wedding Celebrations" title="Join Us For Every Moment">
          From turmeric mornings to a starlit reception — we would love you beside us.
        </SectionHeading>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {wedding.events.map((e, i) => (
            <Reveal key={e.id} delay={(i % 2) * 150}>
              <article className="frame-gold group h-full overflow-hidden rounded-[2rem] bg-emerald-deep/90">
                <div className="relative overflow-hidden p-3 pb-0">
                  <img
                    src={e.image}
                    alt={e.imageAlt}
                    className="arch-top aspect-[3/2] w-full object-cover transition-transform duration-[1.6s] group-hover:scale-105"
                    loading="lazy"
                    width={1536}
                    height={1024}
                  />
                  <span className="absolute left-1/2 top-6 -translate-x-1/2 rounded-full bg-emerald-deep/80 px-4 py-1 font-display text-[0.65rem] uppercase tracking-[0.3em] text-gold backdrop-blur">
                    {e.localName}
                  </span>
                </div>
                <div className="p-7 text-center sm:p-9">
                  <h3 className="font-script text-5xl text-gold-gradient">{e.name}</h3>
                  <p className="mt-2 font-display text-sm uppercase tracking-[0.2em] text-cream">
                    {formatLongDate(e.start, tz)}
                  </p>
                  <p className="mx-auto mt-4 max-w-sm text-lg italic leading-relaxed text-muted-foreground">
                    {e.description}
                  </p>
                  <ul className="mx-auto mt-6 max-w-sm space-y-2.5 text-left text-lg [&_svg]:mt-1 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-gold">
                    <li className="flex gap-3">
                      <Clock />
                      {formatTimeRange(e.start, e.end, tz)} {wedding.timeZoneLabel}
                    </li>
                    <li className="flex gap-3">
                      <MapPin />
                      <span>
                        {e.venue}
                        <span className="block text-base text-muted-foreground">{e.address}</span>
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <Shirt />
                      Attire: {e.attire}
                    </li>
                  </ul>
                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <Button variant="regal" size="pill" asChild>
                      <a href={googleMapsUrl(e.mapQuery)} target="_blank" rel="noopener noreferrer">
                        <MapPin /> Directions
                      </a>
                    </Button>
                    <CalendarMenu entries={[eventEntry(e)]} fileName={`wedding-${e.id}`} label="Save the date" />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <CalendarMenu
            entries={allEntries}
            fileName="wedding-all-events"
            label="Add all events to calendar"
            variant="royal"
            size="xl"
          />
        </Reveal>
      </div>
    </section>
  );
}

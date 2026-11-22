import type { ReactNode } from "react";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { wedding } from "@/config/wedding";
import { formatLongDate, formatTimeRange } from "@/lib/wedding-dates";
import { googleMapsUrl } from "@/lib/wedding-links";
import { CalendarMenu } from "./Shared";
import { muhurthamEntry } from "./calendar-entries";
import { Reveal } from "./Effects";
import { Gopuram, KolamDivider, KuthuVilakku, MangoTorana, TempleBell } from "./Ornaments";

const tz = wedding.timeZoneOffsetMinutes;

export function Hero() {
  const { bride, groom, muhurtham, venue } = wedding;
  return (
    <section className="relative overflow-hidden bg-emerald-glow">
      <div className="absolute inset-0 bg-kolam opacity-70" />
      <Gopuram className="pointer-events-none absolute left-1/2 top-16 w-[min(640px,140vw)] -translate-x-1/2 text-gold/10" />
      <MangoTorana className="absolute inset-x-0 top-0 h-14 w-full sm:h-20" />
      <TempleBell className="absolute left-6 top-10 h-16 sm:left-16 sm:h-20" />
      <TempleBell className="absolute right-6 top-10 h-16 sm:right-16 sm:h-20" delay={1.2} />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-28 sm:pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="text-center">
          <Reveal>
            <p className="font-indic text-lg text-gold">{wedding.invocation}</p>
            <p className="mt-1 font-display text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
              {wedding.invocationEnglish}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="mx-auto mt-8 max-w-xl text-lg italic leading-relaxed text-cream sm:text-xl">
              {wedding.inviteLine}
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-8">
            <h1 className="flex flex-col items-center">
              <span className="font-script text-7xl leading-[1.1] text-gold-gradient animate-shimmer sm:text-8xl lg:text-[7.5rem]">
                {bride.name}
              </span>
              <span className="mt-1 text-sm italic text-muted-foreground sm:text-base">{bride.parents}</span>
              <span className="my-3 font-display text-3xl text-gold sm:text-4xl">&amp;</span>
              <span className="font-script text-7xl leading-[1.1] text-gold-gradient animate-shimmer sm:text-8xl lg:text-[7.5rem]">
                {groom.name}
              </span>
              <span className="mt-1 text-sm italic text-muted-foreground sm:text-base">{groom.parents}</span>
            </h1>
          </Reveal>

          <Reveal delay={360}>
            <KolamDivider className="mt-10" />
            <dl className="mx-auto mt-8 grid max-w-xl gap-6 text-center sm:grid-cols-2 sm:text-left">
              <Detail icon={<CalendarDays />} label="Wedding Date">
                {formatLongDate(muhurtham.start, tz)}
              </Detail>
              <Detail icon={<Clock />} label="Muhurtham">
                {formatTimeRange(muhurtham.start, muhurtham.end, tz)} {wedding.timeZoneLabel}
                <span className="block text-sm italic text-muted-foreground">{muhurtham.lagna}</span>
              </Detail>
              <Detail icon={<MapPin />} label="Venue" wide>
                {venue.name}
                <span className="block text-base text-muted-foreground">{venue.address}</span>
              </Detail>
            </dl>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button variant="regal" size="pill" asChild>
                <a href={googleMapsUrl(venue.mapQuery)} target="_blank" rel="noopener noreferrer">
                  <MapPin /> View on Google Maps
                </a>
              </Button>
              <CalendarMenu entries={[muhurthamEntry]} fileName="wedding-muhurtham" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-6 rounded-full bg-lamp-glow opacity-70 blur-2xl" />
          <div className="frame-gold arch-top relative overflow-hidden bg-emerald-deep p-2">
            <img
              src={wedding.images.couple}
              alt={wedding.images.coupleAlt}
              className="arch-top aspect-[2/3] w-full object-cover"
              width={1024}
              height={1536}
            />
          </div>
          <KuthuVilakku className="absolute -bottom-4 -left-10 h-40 sm:-left-16 sm:h-52" />
          <KuthuVilakku className="absolute -bottom-4 -right-10 h-40 sm:-right-16 sm:h-52" />
        </Reveal>
      </div>
      <div className="temple-band" />
    </section>
  );
}

function Detail({
  icon,
  label,
  children,
  wide,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <dt className="flex items-center justify-center gap-2 font-display text-[0.7rem] sm:justify-start uppercase tracking-[0.3em] text-gold [&_svg]:size-4">
        {icon}
        {label}
      </dt>
      <dd className="mt-1.5 text-xl leading-snug text-ivory">{children}</dd>
    </div>
  );
}

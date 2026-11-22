import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { wedding } from "@/config/wedding";
import { googleMapsEmbedUrl, googleMapsUrl } from "@/lib/wedding-links";
import { Reveal } from "./Effects";
import { SectionHeading } from "./Shared";

export function Venue() {
  const { venue } = wedding;
  return (
    <section id="venue" className="relative bg-emerald-glow py-20 sm:py-28">
      <div className="absolute inset-0 bg-kolam opacity-60" />
      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow="Kalyana Mantapa" title="The Wedding Venue" />
        <Reveal className="mt-14 grid items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="frame-gold flex flex-col justify-center rounded-[2rem] bg-emerald-deep/90 p-8 text-center sm:p-10">
            <MapPin className="mx-auto size-8 text-gold" />
            <h3 className="mt-4 font-display text-2xl leading-snug text-gold-gradient">{venue.name}</h3>
            <p className="mt-4 text-lg leading-relaxed text-cream">{venue.address}</p>
            <div className="mt-8 flex justify-center">
              <Button variant="royal" size="xl" asChild>
                <a href={googleMapsUrl(venue.mapQuery)} target="_blank" rel="noopener noreferrer">
                  <Navigation /> Open in Google Maps
                </a>
              </Button>
            </div>
          </div>
          <div className="frame-gold overflow-hidden rounded-[2rem] bg-emerald-deep">
            <iframe
              title={`Map to ${venue.name}`}
              src={googleMapsEmbedUrl(venue.mapQuery)}
              className="h-80 w-full grayscale-[30%] lg:h-full lg:min-h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

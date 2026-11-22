import { wedding } from "@/config/wedding";
import { Reveal } from "./Effects";
import { SectionHeading } from "./Shared";

const RITUALS = [
  { name: "Kashi Yatra", text: "The groom's playful pilgrimage, until the bride's father invites him to marry." },
  { name: "Maalai Maatral", text: "Fragrant garlands of jasmine exchanged three times, joining two hearts." },
  { name: "Kanyadaanam", text: "With tender blessings, the bride's parents place her hand in the groom's." },
  { name: "Mangalya Dharanam", text: "At the auspicious muhurtham, the sacred thali is tied amidst nadaswaram." },
  { name: "Saptapadi", text: "Seven steps around the sacred fire — seven promises for a lifetime." },
];

export function Heritage() {
  return (
    <section className="relative overflow-hidden bg-emerald-deep py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Kalyana Vaibhavam" title="A Celebration of Tradition">
          Under a mandap of jasmine and mango leaves, in the glow of brass lamps, two families
          become one.
        </SectionHeading>

        <Reveal className="mt-14">
          <div className="frame-gold relative overflow-hidden rounded-[2rem]">
            <img
              src={wedding.images.mandap}
              alt={wedding.images.mandapAlt}
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/8]"
              loading="lazy"
              width={1536}
              height={1024}
            />
            <div className="absolute inset-0 bg-veil" />
            <p className="absolute inset-x-0 bottom-6 px-6 text-center font-script text-4xl text-gold-gradient sm:bottom-10 sm:text-6xl">
              Shubha Vivaha
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {RITUALS.map((r, i) => (
            <Reveal key={r.name} delay={i * 100}>
              <div className="h-full rounded-2xl border border-gold/25 bg-card/60 p-6 text-center transition-colors hover:border-gold/60">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 font-display text-sm text-gold">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-display text-base tracking-wide text-gold">{r.name}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

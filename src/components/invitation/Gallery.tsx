import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { wedding } from "@/config/wedding";
import { cn } from "@/lib/utils";
import { Reveal } from "./Effects";
import { SectionHeading } from "./Shared";

const photos = wedding.gallery;

export function Gallery() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const touchX = useRef<number | null>(null);

  const go = useCallback((delta: number) => {
    setIndex((i) => (i + delta + photos.length) % photos.length);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => go(1), 5000);
    return () => window.clearInterval(id);
  }, [playing, go, index]);

  return (
    <section id="gallery" className="relative bg-emerald-deep py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow="Cherished Moments" title="Our Story in Frames" />

        <Reveal className="mt-14">
          <div
            className="frame-gold relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-emerald-deep sm:aspect-[16/10]"
            onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
            onTouchEnd={(e) => {
              const start = touchX.current;
              const end = e.changedTouches[0]?.clientX;
              if (start == null || end == null) return;
              if (Math.abs(end - start) > 40) go(end < start ? 1 : -1);
              touchX.current = null;
            }}
            aria-roledescription="carousel"
            aria-label="Photo gallery"
          >
            {photos.map((p, i) => (
              <div
                key={p.src}
                className={cn(
                  "absolute inset-0 transition-opacity duration-1000",
                  i === index ? "opacity-100" : "opacity-0",
                )}
                aria-hidden={i !== index}
              >
                <img src={p.src} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl" />
                <img
                  src={p.src}
                  alt={p.alt}
                  className={cn("relative h-full w-full object-contain", i === index && "animate-ken-burns")}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-emerald-deep/70 text-gold backdrop-blur transition hover:bg-gold/20"
              aria-label="Previous photo"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-emerald-deep/70 text-gold backdrop-blur transition hover:bg-gold/20"
              aria-label="Next photo"
            >
              <ChevronRight className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 bg-emerald-deep/70 text-gold backdrop-blur"
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            >
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            {photos.map((p, i) => (
              <button
                key={p.src}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  "h-14 w-14 overflow-hidden rounded-full border-2 transition-all sm:h-16 sm:w-16",
                  i === index ? "border-gold shadow-gold" : "border-gold/20 opacity-60 hover:opacity-100",
                )}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === index}
              >
                <img src={p.src} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

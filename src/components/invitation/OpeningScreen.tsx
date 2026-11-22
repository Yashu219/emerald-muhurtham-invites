import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { wedding } from "@/config/wedding";
import { JasmineStrand, KuthuVilakku, MangoTorana, Monogram, TempleBell } from "./Ornaments";

const STRANDS = [9, 13, 7, 15, 10, 6, 12, 8, 14, 9, 11];

export function OpeningScreen({ onOpen, onDone }: { onOpen: () => void; onDone: () => void }) {
  const [opening, setOpening] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!opening) return;
    const t1 = window.setTimeout(() => setFading(true), 2000);
    const t2 = window.setTimeout(onDone, 3000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [opening, onDone]);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    onOpen();
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 overflow-hidden bg-emerald-deep transition-opacity duration-1000",
        fading && "pointer-events-none opacity-0",
      )}
      role="dialog"
      aria-label="Wedding invitation cover"
    >
      {/* Light that pours out when the doors open */}
      <div className="absolute inset-0 bg-emerald-glow" />
      <div className="absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 bg-lamp-glow" />

      {/* Temple doors */}
      <div className={cn("door-stage absolute inset-0 flex", opening && "doors-open")}>
        <div className="door-leaf door-left relative h-full w-1/2 overflow-hidden shadow-deep">
          <img
            src={wedding.images.door}
            alt=""
            className="absolute left-0 top-0 h-full w-[200%] max-w-none object-cover"
          />
          <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-emerald-deep/70 to-transparent" />
        </div>
        <div className="door-leaf door-right relative h-full w-1/2 overflow-hidden shadow-deep">
          <img
            src={wedding.images.door}
            alt=""
            className="absolute right-0 top-0 h-full w-[200%] max-w-none object-cover"
          />
          <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-emerald-deep/70 to-transparent" />
        </div>
      </div>

      {/* Garlands & lamps */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 transition-opacity duration-700",
          opening && "opacity-0",
        )}
      >
        <MangoTorana className="h-14 w-full sm:h-20" leaves={13} />
        <div className="absolute inset-x-0 top-3 flex justify-between px-1 sm:px-4">
          {STRANDS.map((len, i) => (
            <JasmineStrand
              key={i}
              length={len}
              className={cn("w-3 sm:w-4", i % 2 === 1 && "hidden sm:block")}
            />
          ))}
        </div>
      </div>
      <KuthuVilakku className="pointer-events-none absolute bottom-3 left-2 h-[26vh] max-h-60 drop-shadow-2xl sm:left-8" />
      <KuthuVilakku className="pointer-events-none absolute bottom-3 right-2 h-[26vh] max-h-60 drop-shadow-2xl sm:right-8" />

      {/* Cover card */}
      <div
        className={cn(
          "relative z-10 flex h-full items-center justify-center px-6 transition-all duration-700",
          opening && "scale-95 opacity-0",
        )}
      >
        <div className="frame-gold animate-rise relative w-full max-w-sm rounded-[2rem] bg-emerald-deep/85 px-6 py-9 text-center backdrop-blur-md sm:max-w-md sm:px-10">
          <div className="absolute -top-7 left-1/2 flex -translate-x-1/2 gap-10">
            <TempleBell className="h-14" />
            <TempleBell className="h-14" delay={0.8} />
          </div>
          <p className="font-indic text-base text-gold">{wedding.invocation}</p>
          <Monogram
            left={wedding.bride.name.charAt(0)}
            right={wedding.groom.name.charAt(0)}
            className="mx-auto my-6 w-32 text-[17px] sm:w-36 sm:text-[19px]"
          />
          <p className="font-serif text-xl italic leading-snug text-cream sm:text-2xl">
            {wedding.openingBlessing}
          </p>
          <p className="mt-4 font-display text-xs uppercase tracking-[0.35em] text-gold">
            {wedding.bride.name} &amp; {wedding.groom.name}
          </p>
          <Button variant="royal" size="xl" onClick={handleOpen} className="animate-soft-pulse mt-8">
            Open Wedding Invitation
          </Button>
          <p className="mt-4 text-xs italic text-muted-foreground">Tap to open · music will play</p>
        </div>
      </div>
    </div>
  );
}

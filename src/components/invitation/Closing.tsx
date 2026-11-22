import { wedding } from "@/config/wedding";
import { Reveal } from "./Effects";
import { Gopuram, KolamDivider, KuthuVilakku, MangoTorana, Monogram } from "./Ornaments";

export function Closing() {
  return (
    <section className="relative overflow-hidden bg-emerald-deep pb-16 pt-24 sm:pt-28">
      <MangoTorana className="absolute inset-x-0 top-0 h-12 w-full rotate-0 sm:h-16" leaves={17} />
      <Gopuram className="pointer-events-none absolute bottom-0 left-1/2 w-[min(560px,130vw)] -translate-x-1/2 text-gold/10" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <Monogram
            left={wedding.bride.name.charAt(0)}
            right={wedding.groom.name.charAt(0)}
            className="mx-auto w-28 text-[15px]"
          />
          <p className="mt-10 font-script text-5xl leading-tight text-gold-gradient sm:text-7xl">
            {wedding.closing.message}
          </p>
          <KolamDivider className="mt-8" />
          <p className="mt-8 whitespace-pre-line font-serif text-xl italic leading-relaxed text-cream">
            {wedding.closing.signedBy}
          </p>
          <p className="mt-6 font-display text-xs uppercase tracking-[0.4em] text-gold">
            {wedding.closing.hashtag}
          </p>
        </Reveal>
        <div className="mt-12 flex items-end justify-center gap-24 sm:gap-40">
          <KuthuVilakku className="h-32 sm:h-40" />
          <KuthuVilakku className="h-32 sm:h-40" />
        </div>
      </div>
      <div className="temple-band absolute inset-x-0 bottom-0" />
    </section>
  );
}

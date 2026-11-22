import { Music2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function MusicToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-emerald-deep shadow-gold transition-transform active:scale-95",
        playing && "animate-soft-pulse",
      )}
      aria-label={playing ? "Pause music" : "Play music"}
      aria-pressed={playing}
    >
      {playing ? (
        <span className="flex h-5 items-end gap-[3px]" aria-hidden="true">
          {[0, 0.2, 0.4, 0.1].map((d) => (
            <span
              key={d}
              className="animate-eq block h-full w-[3px] rounded-full bg-emerald-deep"
              style={{ animationDelay: `${d}s` }}
            />
          ))}
        </span>
      ) : (
        <Music2 className="size-6" />
      )}
    </button>
  );
}

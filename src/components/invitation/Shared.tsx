import { CalendarPlus } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buildIcs, googleCalendarUrl, type CalendarEntry } from "@/lib/wedding-links";
import { cn } from "@/lib/utils";
import { Flourish, KolamDivider } from "./Ornaments";

export function SectionHeading({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <p className="flex items-center justify-center gap-3 font-display text-xs uppercase tracking-[0.35em] text-gold">
        <Flourish />
        {eyebrow}
        <Flourish />
      </p>
      <h2 className="mt-4 font-display text-3xl leading-tight text-ivory sm:text-5xl">{title}</h2>
      <KolamDivider className="mt-5" />
      {children && <p className="mt-5 text-lg italic text-muted-foreground sm:text-xl">{children}</p>}
    </div>
  );
}

function downloadIcs(entries: CalendarEntry[], fileName: string) {
  const ics = buildIcs(entries, fileName);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function CalendarMenu({
  entries,
  fileName,
  label = "Add to Calendar",
  variant = "regal",
  size = "pill",
}: {
  entries: CalendarEntry[];
  fileName: string;
  label?: string;
  variant?: "regal" | "royal" | "maroon";
  size?: "pill" | "xl";
}) {
  const first = entries[0];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size}>
          <CalendarPlus />
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="min-w-56 border-gold/40 bg-emerald-deep font-serif text-base">
        {entries.length === 1 && first ? (
          <DropdownMenuItem asChild>
            <a href={googleCalendarUrl(first)} target="_blank" rel="noopener noreferrer">
              Google Calendar
            </a>
          </DropdownMenuItem>
        ) : (
          entries.map((e) => (
            <DropdownMenuItem key={e.title} asChild>
              <a href={googleCalendarUrl(e)} target="_blank" rel="noopener noreferrer">
                Google · {e.title.split(" · ")[0]}
              </a>
            </DropdownMenuItem>
          ))
        )}
        <DropdownMenuItem onSelect={() => downloadIcs(entries, fileName)}>
          Apple / Outlook calendar (.ics)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

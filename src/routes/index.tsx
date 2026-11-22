import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { wedding } from "@/config/wedding";
import { formatShortDate } from "@/lib/wedding-dates";
import { OpeningScreen } from "@/components/invitation/OpeningScreen";
import { Hero } from "@/components/invitation/Hero";
import { Countdown } from "@/components/invitation/Countdown";
import { Heritage } from "@/components/invitation/Heritage";
import { Events } from "@/components/invitation/Events";
import { Gallery } from "@/components/invitation/Gallery";
import { Venue } from "@/components/invitation/Venue";
import { Rsvp } from "@/components/invitation/Rsvp";
import { Closing } from "@/components/invitation/Closing";
import { FloatingPetals } from "@/components/invitation/Effects";
import { MusicToggle } from "@/components/invitation/MusicToggle";

const couple = `${wedding.bride.name} & ${wedding.groom.name}`;
const date = formatShortDate(wedding.muhurtham.start, wedding.timeZoneOffsetMinutes);
const title = `${couple} — Wedding Invitation · ${date}`;
const description = `${wedding.openingBlessing}, we invite you to the wedding of ${couple} on ${date} at ${wedding.venue.name}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [coverVisible, setCoverVisible] = useState(true);
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    document.body.style.overflow = coverVisible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [coverVisible]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.55;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) play();
    else {
      audio.pause();
      setPlaying(false);
    }
  };

  const handleOpen = useCallback(() => {
    setOpened(true);
    window.scrollTo(0, 0);
    play();
  }, [play]);

  const handleDone = useCallback(() => setCoverVisible(false), []);

  return (
    <>
      <audio ref={audioRef} src={wedding.music.src} loop preload="none" />
      {coverVisible && <OpeningScreen onOpen={handleOpen} onDone={handleDone} />}
      {opened && <FloatingPetals />}
      <main>
        <Hero />
        <Countdown />
        <Heritage />
        <Events />
        <Gallery />
        <Venue />
        <Rsvp />
        <Closing />
      </main>
      {opened && <MusicToggle playing={playing} onToggle={toggleMusic} />}
    </>
  );
}

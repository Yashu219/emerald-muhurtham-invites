import { Link2, MessageCircle, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { wedding } from "@/config/wedding";
import { whatsappChatUrl, whatsappShareUrl } from "@/lib/wedding-links";
import { Reveal } from "./Effects";
import { SectionHeading } from "./Shared";

export function Rsvp() {
  const shareOnWhatsApp = () => {
    const url = window.location.href.split("#")[0];
    window.open(whatsappShareUrl(`${wedding.shareMessage} ${url}`), "_blank", "noopener");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href.split("#")[0] ?? "");
      toast.success("Invitation link copied");
    } catch {
      toast.error("Couldn't copy — please copy the address from your browser");
    }
  };

  return (
    <section id="rsvp" className="relative bg-maroon-gradient py-20 sm:py-24">
      <div className="absolute inset-0 bg-kolam opacity-40" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <SectionHeading eyebrow="Kindly Respond" title="Will You Bless Us?">
          Please let us know you'll be joining us — a quick WhatsApp message is all it takes.
        </SectionHeading>
        <Reveal className="mt-10 flex flex-col items-center gap-4">
          <Button variant="royal" size="xl" asChild>
            <a
              href={whatsappChatUrl(wedding.rsvpWhatsApp, wedding.rsvpMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle /> RSVP on WhatsApp
            </a>
          </Button>
          <p className="text-base italic text-cream/80">RSVP to {wedding.rsvpContactName}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Button variant="regal" size="pill" onClick={shareOnWhatsApp}>
              <Share2 /> Share invitation on WhatsApp
            </Button>
            <Button variant="regal" size="pill" onClick={copyLink}>
              <Link2 /> Copy link
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

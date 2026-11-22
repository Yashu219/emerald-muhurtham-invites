/**
 * ✦ EDIT YOUR INVITATION HERE ✦
 *
 * Every name, date, time, venue, photo, phone number and message on the invitation
 * comes from this one file. Change the text between the quotes and save.
 *
 * Dates use the format "YYYY-MM-DDTHH:MM:SS+05:30" (the +05:30 is Indian Standard Time).
 * Photos: put new images in src/assets/ and change the import lines below.
 */
import coupleHero from "@/assets/couple-hero.webp";
import templeDoor from "@/assets/temple-door.webp";
import mandap from "@/assets/mandap.webp";
import haldiImg from "@/assets/event-haldi.webp";
import mehendiImg from "@/assets/event-mehendi.webp";
import muhurthamImg from "@/assets/event-muhurtham.webp";
import receptionImg from "@/assets/event-reception.webp";
import gallery1 from "@/assets/gallery-1.webp";
import gallery2 from "@/assets/gallery-2.webp";
import gallery3 from "@/assets/gallery-3.webp";
import gallery4 from "@/assets/gallery-4.webp";

export type WeddingEvent = {
  id: string;
  name: string;
  localName: string;
  description: string;
  start: string;
  end: string;
  venue: string;
  address: string;
  mapQuery: string;
  attire: string;
  image: string;
  imageAlt: string;
};

export const wedding = {
  /** Minutes ahead of UTC for every time shown (India = 330). */
  timeZoneOffsetMinutes: 330,
  timeZoneLabel: "IST",

  bride: {
    name: "Lakshmi",
    fullName: "Lakshmi Priya",
    parents: "Daughter of Smt. Kamala & Sri Ramesh Rao",
  },
  groom: {
    name: "Arjun",
    fullName: "Arjun Krishna",
    parents: "Son of Smt. Saroja & Sri Venkatesh Iyer",
  },

  invocation: "॥ ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ॥",
  invocationEnglish: "Shri Ganeshaya Namah",
  openingBlessing: "With the blessings of the Almighty and our elders",
  inviteLine:
    "With the blessings of our elders and the grace of the Almighty, we joyfully invite you to celebrate the wedding of",

  /** The main wedding moment — drives the countdown. */
  muhurtham: {
    start: "2027-02-14T09:30:00+05:30",
    end: "2027-02-14T10:30:00+05:30",
    lagna: "Meena Lagna",
  },

  venue: {
    name: "Sri Lakshmi Venkateshwara Kalyana Mantapa",
    address: "No. 24, 8th Cross Road, Malleshwaram, Bengaluru, Karnataka 560003",
    mapQuery: "Malleshwaram 8th Cross, Bengaluru 560003",
  },

  events: [
    {
      id: "haldi",
      name: "Haldi",
      localName: "Arishina Shastra",
      description:
        "A morning of turmeric, laughter and blessings as the families anoint the bride and groom.",
      start: "2027-02-12T10:00:00+05:30",
      end: "2027-02-12T13:00:00+05:30",
      venue: "Rao Family Residence",
      address: "No. 11, 4th Block, Jayanagar, Bengaluru 560011",
      mapQuery: "4th Block Jayanagar, Bengaluru 560011",
      attire: "Yellow & ivory",
      image: haldiImg,
      imageAlt: "Brass bowls of turmeric paste with mango leaves and a brass lamp",
    },
    {
      id: "mehendi",
      name: "Mehendi",
      localName: "Mehendi & Sangeet",
      description: "An evening of henna, music and dance with family and friends.",
      start: "2027-02-12T17:30:00+05:30",
      end: "2027-02-12T21:30:00+05:30",
      venue: "Rao Family Residence — Garden Lawn",
      address: "No. 11, 4th Block, Jayanagar, Bengaluru 560011",
      mapQuery: "4th Block Jayanagar, Bengaluru 560011",
      attire: "Green & festive colours",
      image: mehendiImg,
      imageAlt: "Bride's hands with henna holding jasmine flowers on an emerald silk saree",
    },
    {
      id: "muhurtham",
      name: "Muhurtham",
      localName: "Kalyana Mahotsava",
      description:
        "The sacred wedding ceremony — Kashi Yatra, Kanyadaanam, Mangalya Dharanam and Saptapadi.",
      start: "2027-02-14T09:30:00+05:30",
      end: "2027-02-14T10:30:00+05:30",
      venue: "Sri Lakshmi Venkateshwara Kalyana Mantapa",
      address: "No. 24, 8th Cross Road, Malleshwaram, Bengaluru, Karnataka 560003",
      mapQuery: "Malleshwaram 8th Cross, Bengaluru 560003",
      attire: "Traditional silks",
      image: muhurthamImg,
      imageAlt: "Mangalsutra on a brass plate with turmeric, kumkum, jasmine and a lit lamp",
    },
    {
      id: "reception",
      name: "Reception",
      localName: "Aaratakshate",
      description: "Join us for an evening of dinner, music and celebration with the newlyweds.",
      start: "2027-02-14T19:00:00+05:30",
      end: "2027-02-14T22:30:00+05:30",
      venue: "The Emerald Palace Banquets",
      address: "Palace Road, Vasanth Nagar, Bengaluru, Karnataka 560052",
      mapQuery: "Palace Road, Vasanth Nagar, Bengaluru 560052",
      attire: "Evening formal",
      image: receptionImg,
      imageAlt: "Reception stage with gold temple arches, jasmine garlands and candles",
    },
  ] satisfies WeddingEvent[],

  gallery: [
    { src: gallery1, alt: "The couple laughing together in a carved stone temple corridor" },
    { src: gallery2, alt: "Bride and groom exchanging jasmine garlands as family showers petals" },
    { src: gallery3, alt: "Bride's long braid adorned with jasmine and gold jewellery" },
    { src: gallery4, alt: "The couple walking hand in hand beside a temple pond at sunrise" },
  ],

  images: {
    couple: coupleHero,
    coupleAlt:
      "Illustration of the bride in a maroon Kanjeevaram saree with temple jewellery and the groom in silk panche and angavastram",
    door: templeDoor,
    mandap,
    mandapAlt: "Wedding mandap decorated with jasmine, marigold, banana leaves and brass lamps",
  },

  /** WhatsApp number that receives RSVPs — country code + number, e.g. "919876543210". */
  rsvpWhatsApp: "919876543210",
  rsvpContactName: "Ramesh Rao (Bride's father)",
  rsvpMessage: "Namaskara! I'm delighted to confirm my presence at Lakshmi & Arjun's wedding. 🙏",
  shareMessage:
    "You are cordially invited to the wedding of Lakshmi & Arjun on 14 February 2027 in Bengaluru. Please open the invitation:",

  music: {
    src: "/audio/wedding-music.mp3",
    title: "Mangala Vadyam — instrumental",
  },

  closing: {
    message: "Your presence and blessings mean the world to us.",
    signedBy: "With love & regards,\nThe Rao & Iyer Families",
    hashtag: "#LakshmiWedsArjun",
  },
};

export type Wedding = typeof wedding;

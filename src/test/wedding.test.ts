import { describe, expect, it } from "vitest";
import { formatLongDate, formatTime, getTimeLeft } from "@/lib/wedding-dates";
import { googleCalendarUrl, toCalendarStamp, whatsappChatUrl } from "@/lib/wedding-links";

const IST = 330;

describe("wedding dates", () => {
  it("shows the muhurtham in Indian time", () => {
    expect(formatLongDate("2027-02-14T09:30:00+05:30", IST)).toBe("Sunday, 14 February 2027");
    expect(formatTime("2027-02-14T09:30:00+05:30", IST)).toBe("9:30 AM");
    expect(formatTime("2027-02-14T19:00:00+05:30", IST)).toBe("7:00 PM");
  });

  it("counts down days, hours, minutes and seconds", () => {
    const target = Date.parse("2027-02-14T09:30:00+05:30");
    const now = target - (2 * 86_400 + 3 * 3600 + 4 * 60 + 5) * 1000;
    expect(getTimeLeft(target, now)).toEqual({ days: 2, hours: 3, minutes: 4, seconds: 5, done: false });
    expect(getTimeLeft(target, target + 1000).done).toBe(true);
  });
});

describe("wedding links", () => {
  it("converts IST times to UTC calendar stamps", () => {
    expect(toCalendarStamp("2027-02-14T09:30:00+05:30")).toBe("20270214T040000Z");
    const url = googleCalendarUrl({
      title: "Muhurtham",
      start: "2027-02-14T09:30:00+05:30",
      end: "2027-02-14T10:30:00+05:30",
      location: "Bengaluru",
      details: "",
    });
    expect(url).toContain("dates=20270214T040000Z%2F20270214T050000Z");
  });

  it("sends RSVPs to the configured WhatsApp number", () => {
    expect(whatsappChatUrl("+91 98765-43210", "Hi")).toBe("https://wa.me/919876543210?text=Hi");
  });
});

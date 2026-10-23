import { AUTOPLAY_MS, FADE_MS } from "../logic/slider.js";

/**
 * Marketing site copy. Later event templates can export the same shape
 * and pass it to renderPage(). Visible marketing lines are marked
 * "Placeholder" so they are not mistaken for final copy.
 *
 * Hero slides accept an optional photo:
 * { id, label, src: "photos/night.jpg", alt: "Guests under string lights" }
 * Leave src off for a palette color field. Informative photos need alt text.
 */
export const marketing = {
  palette: "c",
  meta: {
    title: "Sidebite — Placeholder landing page",
    description:
      "Placeholder: Sidebite builds a landing page and an RSVP form for any event.",
  },
  logo: "Sidebite",
  nav: [
    { href: "#how-it-works", label: "How it works" },
    { href: "#events", label: "Event types" },
    { href: "#rsvp", label: "RSVP demo" },
  ],
  hero: {
    autoplayMs: AUTOPLAY_MS,
    fadeMs: FADE_MS,
    kicker: "Placeholder copy",
    title: "Landing pages for any event.",
    lede: "Placeholder: Sidebite publishes a landing page and an RSVP form for the event you describe. Swap this sentence for the final line.",
    cta: { href: "#rsvp", label: "See the RSVP demo" },
    slides: [
      { id: "slide-1", label: "Placeholder slide 1" },
      { id: "slide-2", label: "Placeholder slide 2" },
      { id: "slide-3", label: "Placeholder slide 3" },
    ],
  },
  howItWorks: {
    id: "how-it-works",
    eyebrow: "Placeholder copy",
    title: "How it works",
    intro:
      "Placeholder: three steps from a blank date to a page people can RSVP on.",
    steps: [
      {
        title: "Add the event",
        body: "Placeholder: name, date, place, and the detail guests actually need.",
      },
      {
        title: "Choose a template",
        body: "Placeholder: start from this shared layout and a palette. The next event reuses the same blocks.",
      },
      {
        title: "Share the RSVP",
        body: "Placeholder: send one link. Responses in this demo stay in the browser.",
      },
    ],
  },
  eventTypes: {
    id: "events",
    eyebrow: "Placeholder copy",
    title: "Event types",
    intro:
      "Placeholder: the same page structure covers gatherings that look nothing alike.",
    types: [
      {
        title: "Halloween",
        body: "Placeholder: costumes, a start time, and a headcount.",
      },
      {
        title: "Run club",
        body: "Placeholder: the route, the pace, and coffee after.",
      },
      {
        title: "Tech meetup",
        body: "Placeholder: the talk, the room, and how many seats are left.",
      },
      {
        title: "Nightlife / DJ night",
        body: "Placeholder: the lineup, the door time, and the room.",
      },
      {
        title: "Wedding",
        body: "Placeholder: the ceremony, the reception, and a plus-one.",
      },
    ],
  },
  rsvp: {
    id: "rsvp",
    eyebrow: "Placeholder copy",
    title: "RSVP form demo",
    intro:
      "Placeholder: client-side only. Submitting shows a success state on this page and does not contact a server.",
    submitLabel: "RSVP",
    resetLabel: "Submit another response",
    successTitle: "You're on the list.",
    guestsHint: "Placeholder: a whole number from 1 to 10.",
    fields: {
      name: "Name",
      email: "Email",
      guests: "Guests",
    },
  },
  footer: {
    eyebrow: "Placeholder copy",
    blurb:
      "Placeholder: Sidebite, 2026. Swap this footer when the company line is final.",
    paletteLegend: "Palette",
    palettes: [
      { id: "a", label: "TripleTee" },
      { id: "b", label: "Default" },
      { id: "c", label: "Premium" },
    ],
  },
};

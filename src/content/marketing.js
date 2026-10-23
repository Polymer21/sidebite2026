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
  schedule: {
    id: "schedule",
    eyebrow: "Placeholder copy",
    title: "Schedule",
    intro: "Placeholder: each row opens for the detail. It stays closed until someone opens it.",
    rows: [
      {
        id: "schedule-date",
        number: "01",
        time: "Saturday, October 31",
        item: "Date",
        detail: "Placeholder: the gathering starts in the evening.",
      },
      {
        id: "schedule-time",
        number: "02",
        time: "7:00 p.m.",
        item: "Time",
        detail: "Placeholder: doors open half an hour before.",
      },
      {
        id: "schedule-place",
        number: "03",
        time: "Placeholder venue",
        item: "Place",
        detail: "Placeholder: the address goes here when it is final.",
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
  faq: {
    id: "faq",
    eyebrow: "Placeholder copy",
    title: "Questions",
    intro: "Placeholder: each question is a disclosure. It stays closed until someone opens it.",
    items: [
      {
        id: "faq-plus-one",
        question: "Can I bring a plus-one?",
        answer: "Placeholder: yes. Set the guest stepper to the number of people in your party.",
      },
      {
        id: "faq-change",
        question: "Can I change my RSVP?",
        answer: "Placeholder: this demo stays in the browser, so use the reset control and submit again.",
      },
      {
        id: "faq-closed",
        question: "What if the event is full?",
        answer: "Placeholder: the form switches to the Full or Closed state from the page config.",
      },
    ],
  },
  rsvp: {
    id: "rsvp",
    eyebrow: "Placeholder copy",
    title: "RSVP form demo",
    intro:
      "Placeholder: client-side only. Submitting shows a success state on this page and does not contact a server.",
    state: "ready",
    submitLabel: "RSVP",
    resetLabel: "Submit another response",
    successTitle: "You're on the list.",
    guestsMin: 1,
    guestsMax: 10,
    guestsValue: 2,
    guestsHint: "Placeholder: 1 to 10. Use the buttons or the arrow keys.",
    eventLabel: "Event type",
    notePlaceholder: "Placeholder: dietary needs, a song, or a note for the host.",
    statesTitle: "Form states",
    statesIntro:
      "Placeholder: Submitting, Full, Closed, and Error are driven by the page config. The form above stays in the ready state.",
    choices: [
      { value: "halloween", label: "Halloween", selected: true },
      { value: "run-club", label: "Run club" },
      { value: "tech-meetup", label: "Tech meetup" },
      { value: "nightlife", label: "Nightlife / DJ night" },
      { value: "wedding", label: "Wedding" },
      { value: "sold-out", label: "Sold out", disabled: true },
    ],
    states: {
      submitting: {
        title: "Submitting",
        body: "Placeholder: the RSVP is sending. Fields stay visible and the button waits.",
      },
      full: {
        title: "Full",
        body: "Placeholder: this event is full. The form is replaced until a seat opens.",
      },
      closed: {
        title: "Closed",
        body: "Placeholder: RSVPs are closed. The form is replaced with this notice.",
      },
      error: {
        title: "Error",
        body: "Placeholder: check the highlighted fields before this RSVP can send.",
        fields: {
          name: "Enter your name.",
          event: "Pick one option.",
        },
      },
    },
    fields: {
      name: "Name",
      email: "Email",
      guests: "Guests",
      note: "Note",
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

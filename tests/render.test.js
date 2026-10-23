import assert from "node:assert/strict";
import test from "node:test";
import { marketing } from "../src/content/marketing.js";
import { contentFor } from "../src/content/pages.js";
import { renderPage } from "../src/render/page.js";

test("the marketing page is the index content", () => {
  assert.equal(contentFor("/index.html"), marketing);
  assert.equal(contentFor("index.html"), marketing);
  assert.equal(contentFor("/unknown"), marketing);
});

test("rendered markup includes the shared regions and placeholder copy", () => {
  const page = renderPage();
  assert.equal(page.palette, "c");
  assert.match(page.title, /Sidebite/);
  assert.match(page.body, /id="main"/);
  assert.match(page.body, /Skip to content/);
  assert.match(page.body, /<h1 id="hero-title">/);
  assert.match(page.body, /Landing pages for any event\./);
  assert.match(page.body, /How it works/);
  assert.match(page.body, /Halloween/);
  assert.match(page.body, /Run club/);
  assert.match(page.body, /Tech meetup/);
  assert.match(page.body, /Nightlife \/ DJ night/);
  assert.match(page.body, /Wedding/);
  assert.match(page.body, /id="rsvp-name"/);
  assert.match(page.body, /id="rsvp-email"/);
  assert.match(page.body, /id="rsvp-guests"/);
  assert.match(page.body, /data-component="top-bar"/);
  assert.match(page.body, /data-component="pill-arrow"/);
  assert.match(page.body, /data-component="textarea"/);
  assert.match(page.body, /data-component="choice-chip"/);
  assert.match(page.body, /data-component="guest-count-stepper"/);
  assert.match(page.body, /data-component="schedule-row"/);
  assert.match(page.body, /data-component="faq-item"/);
  assert.match(page.body, /role="spinbutton"/);
  assert.match(page.body, /aria-valuemin="1"/);
  assert.match(page.body, /aria-valuemax="10"/);
  assert.match(page.body, /aria-expanded="false"/);
  assert.match(page.body, /aria-controls="faq-plus-one"/);
  assert.match(page.body, /data-rsvp-state="ready"/);
  assert.match(page.body, /data-rsvp-state="submitting"/);
  assert.match(page.body, /data-rsvp-state="full"/);
  assert.match(page.body, /data-rsvp-state="closed"/);
  assert.match(page.body, /data-rsvp-state="error"/);
  assert.match(page.body, /aria-controls="schedule-date"/);
  assert.match(page.body, /class="schedule-row__trigger"/);
  assert.match(page.body, /Sold out/);
  assert.match(page.body, /data-autoplay="5000"/);
  assert.match(page.body, /data-fade="600"/);
  assert.match(page.body, /--hero-fade: 600ms/);
  assert.equal(page.body.match(/data-hero-dot=/g).length, 3);
  assert.equal(page.body.match(/data-slide=/g).length, 3);
  assert.doesNotMatch(page.body, /hero__arrow|aria-label="Previous|aria-label="Next/);
  assert.match(page.body, /Placeholder copy/);
  assert.match(page.body, /data-palette-option="a"/);
  assert.match(page.body, /data-palette-option="b"/);
  assert.match(page.body, /data-palette-option="c"/);
});

test("full and closed RSVP states replace the form from config", () => {
  for (const state of ["full", "closed"]) {
    const content = structuredClone(marketing);
    content.rsvp.state = state;
    const page = renderPage(content);
    assert.match(page.body, new RegExp(`data-rsvp-state="${state}"`));
    assert.doesNotMatch(page.body, /id="rsvp-name"/);
    assert.match(page.body, new RegExp(content.rsvp.states[state].title));
  }
});

test("the error RSVP state keeps the form and uses the config copy", () => {
  const content = structuredClone(marketing);
  content.rsvp.state = "error";
  const page = renderPage(content);
  assert.match(page.body, /data-rsvp-state="error"/);
  assert.match(page.body, /id="rsvp-name"/);
  assert.match(page.body, /aria-invalid="true"/);
  assert.match(page.body, /Enter your name\./);
  assert.match(page.body, /Pick one option\./);
  assert.match(page.body, new RegExp(content.rsvp.states.error.title));
});

test("content is escaped before it reaches the page", () => {
  const hostile = structuredClone(marketing);
  hostile.hero.title = `<img src=x onerror="alert(1)">`;
  hostile.nav[0].href = `javascript:alert(1)`;
  const page = renderPage(hostile);
  assert.match(page.body, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/);
  assert.doesNotMatch(page.body, /<img src=x/);
  assert.doesNotMatch(page.body, /javascript:alert/);
});

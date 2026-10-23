import { marketing } from "../content/marketing.js";
import { renderEventTypes } from "../components/event-types.js";
import { renderFooter } from "../components/footer.js";
import { renderHeader } from "../components/header.js";
import { renderHero } from "../components/hero.js";
import { renderHowItWorks } from "../components/how-it-works.js";
import { renderRsvp } from "../components/rsvp.js";
import { escapeHtml } from "./escape.js";

const PALETTES = new Set(["a", "b", "c"]);

export function renderPage(content = marketing) {
  const palette = PALETTES.has(content.palette) ? content.palette : "c";
  const body = `<a class="skip-link" href="#main">Skip to content</a>
<div class="hero-shell" id="top" data-hero data-autoplay="${Number(content.hero.autoplayMs) || 5000}" data-fade="${Number(content.hero.fadeMs) || 600}">
  ${renderHeader(content)}
  ${renderHero(content.hero)}
</div>
<main id="main" tabindex="-1">
  ${renderHowItWorks(content.howItWorks)}
  ${renderEventTypes(content.eventTypes)}
  ${renderRsvp(content.rsvp)}
</main>
${renderFooter(content)}
<noscript>
  <p class="noscript">Placeholder: the hero slider, palette preview, and RSVP demo need JavaScript. The rest of this page is readable without it.</p>
</noscript>`;

  return {
    palette,
    title: escapeHtml(content.meta.title),
    description: escapeHtml(content.meta.description),
    body,
  };
}

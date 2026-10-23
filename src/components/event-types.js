import { escapeHtml } from "../render/escape.js";

export function renderEventTypes(section) {
  const cards = section.types
    .map(
      (type) => `<li class="event-card">
        <h3>${escapeHtml(type.title)}</h3>
        <p>${escapeHtml(type.body)}</p>
      </li>`,
    )
    .join("");

  return `<section class="section" id="${escapeHtml(section.id)}" aria-labelledby="events-heading">
    <div class="wrap">
      <div class="section__header">
        <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
        <h2 id="events-heading">${escapeHtml(section.title)}</h2>
        <p>${escapeHtml(section.intro)}</p>
      </div>
      <ul class="event-grid">${cards}</ul>
    </div>
  </section>`;
}

import { escapeHtml } from "../render/escape.js";

export function renderFAQItem(item, index) {
  const panelId = item.id || `faq-panel-${index + 1}`;
  const buttonId = `${panelId}-button`;
  return `<div class="faq-item" data-component="faq-item">
    <h3 class="faq-item__heading">
      <button type="button" class="faq-item__trigger" id="${escapeHtml(buttonId)}" aria-expanded="false" aria-controls="${escapeHtml(panelId)}">
        <span>${escapeHtml(item.question)}</span>
      </button>
    </h3>
    <div class="faq-item__panel" id="${escapeHtml(panelId)}" role="region" aria-labelledby="${escapeHtml(buttonId)}" hidden>
      <p>${escapeHtml(item.answer)}</p>
    </div>
  </div>`;
}

export function renderFaq(section) {
  const items = (section.items ?? []).map(renderFAQItem).join("");
  return `<section class="section" id="${escapeHtml(section.id)}" aria-labelledby="faq-heading">
    <div class="wrap">
      <div class="section__header">
        <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
        <h2 id="faq-heading">${escapeHtml(section.title)}</h2>
        <p>${escapeHtml(section.intro)}</p>
      </div>
      <div class="faq">${items}</div>
    </div>
  </section>`;
}

import { escapeHtml } from "../render/escape.js";

export function renderHowItWorks(section) {
  const steps = section.steps
    .map((step, index) => {
      const number = String(index + 1).padStart(2, "0");
      return `<li class="step">
        <span class="step__index" aria-hidden="true">${number}</span>
        <h3>${escapeHtml(step.title)}</h3>
        <p>${escapeHtml(step.body)}</p>
      </li>`;
    })
    .join("");

  return `<section class="section" id="${escapeHtml(section.id)}" aria-labelledby="how-heading">
    <div class="wrap">
      <div class="section__header">
        <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
        <h2 id="how-heading">${escapeHtml(section.title)}</h2>
        <p>${escapeHtml(section.intro)}</p>
      </div>
      <ol class="steps">${steps}</ol>
    </div>
  </section>`;
}

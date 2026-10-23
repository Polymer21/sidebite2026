import { escapeHtml } from "../render/escape.js";

export function renderScheduleRow(row) {
  return `<div class="schedule-row" data-component="schedule-row">
    <dt>${escapeHtml(row.label)}</dt>
    <dd>${escapeHtml(row.value)}</dd>
  </div>`;
}

export function renderSchedule(section) {
  const rows = (section.rows ?? []).map(renderScheduleRow).join("");
  return `<section class="section section--band" id="${escapeHtml(section.id)}" aria-labelledby="schedule-heading">
    <div class="wrap">
      <div class="section__header">
        <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
        <h2 id="schedule-heading">${escapeHtml(section.title)}</h2>
        <p>${escapeHtml(section.intro)}</p>
      </div>
      <dl class="schedule">${rows}</dl>
    </div>
  </section>`;
}

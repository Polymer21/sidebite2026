import { escapeHtml } from "../render/escape.js";

export function renderScheduleRow(row, index) {
  const panelId = row.id || `schedule-panel-${index + 1}`;
  const buttonId = `${panelId}-button`;
  const number = row.number || String(index + 1).padStart(2, "0");
  return `<article class="schedule-row" data-component="schedule-row">
    <h3 class="schedule-row__heading">
      <button type="button" class="schedule-row__trigger" id="${escapeHtml(buttonId)}" aria-expanded="false" aria-controls="${escapeHtml(panelId)}">
        <span class="schedule-row__number">${escapeHtml(number)}</span>
        <span class="schedule-row__stack">
          <span class="schedule-row__time">${escapeHtml(row.time)}</span>
          <span class="schedule-row__item">${escapeHtml(row.item)}</span>
        </span>
      </button>
    </h3>
    <div class="schedule-row__panel" id="${escapeHtml(panelId)}" role="region" aria-labelledby="${escapeHtml(buttonId)}" hidden>
      <p>${escapeHtml(row.detail)}</p>
    </div>
  </article>`;
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
      <div class="schedule">${rows}</div>
    </div>
  </section>`;
}

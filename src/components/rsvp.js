import { escapeHtml } from "../render/escape.js";

function field({ id, name, label, type, autocomplete, inputmode, maxlength, hint }) {
  const hintId = hint ? ` ${id}-hint` : "";
  const describedBy = `${hintId} ${id}-error`.trim();
  const hintHtml = hint
    ? `<p id="${id}-hint" class="field__hint">${escapeHtml(hint)}</p>`
    : "";
  const mode = inputmode ? ` inputmode="${escapeHtml(inputmode)}"` : "";
  const complete = autocomplete ? ` autocomplete="${escapeHtml(autocomplete)}"` : "";

  return `<div class="field">
    <label for="${id}">${escapeHtml(label)}</label>
    <input id="${id}" name="${escapeHtml(name)}" type="${escapeHtml(type)}"${complete}${mode} maxlength="${maxlength}" required aria-describedby="${describedBy}" />
    ${hintHtml}
    <p id="${id}-error" class="field__error" hidden></p>
  </div>`;
}

export function renderRsvp(section) {
  return `<section class="section" id="${escapeHtml(section.id)}" aria-labelledby="rsvp-heading">
    <div class="wrap rsvp__layout">
      <div class="section__header">
        <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
        <h2 id="rsvp-heading">${escapeHtml(section.title)}</h2>
        <p>${escapeHtml(section.intro)}</p>
      </div>
      <div class="rsvp__panel" data-rsvp>
        <form class="rsvp__form" action="#rsvp" method="post" novalidate>
          ${field({
            id: "rsvp-name",
            name: "name",
            label: section.fields.name,
            type: "text",
            autocomplete: "name",
            maxlength: 80,
          })}
          <div class="form-row">
            ${field({
              id: "rsvp-email",
              name: "email",
              label: section.fields.email,
              type: "email",
              autocomplete: "email",
              maxlength: 120,
            })}
            ${field({
              id: "rsvp-guests",
              name: "guests",
              label: section.fields.guests,
              type: "text",
              inputmode: "numeric",
              autocomplete: "off",
              maxlength: 2,
              hint: section.guestsHint,
            })}
          </div>
          <button class="button" type="submit">${escapeHtml(section.submitLabel)}</button>
        </form>
        <div class="rsvp__success" role="status" aria-hidden="true">
          <h3 tabindex="-1" data-rsvp-success-title>${escapeHtml(section.successTitle)}</h3>
          <p data-rsvp-success-copy></p>
          <button class="button button--ghost" type="button" data-rsvp-reset>${escapeHtml(section.resetLabel)}</button>
        </div>
      </div>
    </div>
  </section>`;
}

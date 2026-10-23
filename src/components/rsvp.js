import { renderChoiceChips } from "./choice-chip.js";
import { renderGuestCountStepper } from "./guest-count-stepper.js";
import { renderPillArrowButton } from "./pill-arrow-button.js";
import { renderTextarea } from "./textarea.js";
import { escapeHtml } from "../render/escape.js";

const STATE_ORDER = ["submitting", "full", "closed", "error"];

function field({ id, name, label, type, autocomplete, maxlength, disabled, error = "" }) {
  const complete = autocomplete ? ` autocomplete="${escapeHtml(autocomplete)}"` : "";
  const dis = disabled ? " disabled" : "";
  const invalid = error ? ` aria-invalid="true"` : "";
  const hidden = error ? "" : " hidden";
  return `<div class="field">
    <label for="${id}">${escapeHtml(label)}</label>
    <input id="${id}" name="${escapeHtml(name)}" type="${escapeHtml(type)}"${complete} maxlength="${maxlength}" required aria-describedby="${id}-error"${dis}${invalid} />
    <p id="${id}-error" class="field__error"${hidden}>${escapeHtml(error)}</p>
  </div>`;
}

function renderStateCard(id, copy) {
  const busy = id === "submitting" ? ` aria-busy="true"` : "";
  return `<li class="rsvp-state rsvp-state--${escapeHtml(id)}" data-rsvp-state="${escapeHtml(id)}"${busy}>
    <p class="rsvp-state__kicker">${escapeHtml(id)}</p>
    <h3>${escapeHtml(copy.title)}</h3>
    <p>${escapeHtml(copy.body)}</p>
  </li>`;
}

function renderForm(section, disabled, fieldErrors = {}) {
  const banner = fieldErrors.summary
    ? `<p class="rsvp__error" role="alert">${escapeHtml(fieldErrors.summary)}</p>`
    : "";
  return `<form class="rsvp__form" action="#rsvp" method="post" novalidate>
    <p class="rsvp__status" data-rsvp-status hidden>${escapeHtml(section.states.submitting.title)}</p>
    ${banner}
    ${field({
      id: "rsvp-name",
      name: "name",
      label: section.fields.name,
      type: "text",
      autocomplete: "name",
      maxlength: 80,
      disabled,
      error: fieldErrors.name || "",
    })}
    ${field({
      id: "rsvp-email",
      name: "email",
      label: section.fields.email,
      type: "email",
      autocomplete: "email",
      maxlength: 120,
      disabled,
    })}
    <div class="form-row">
      ${renderGuestCountStepper({
        id: "rsvp-guests",
        name: "guests",
        label: section.fields.guests,
        min: section.guestsMin,
        max: section.guestsMax,
        value: section.guestsValue,
        hint: section.guestsHint,
        disabled,
      })}
    </div>
    ${renderChoiceChips({
      name: "event",
      legend: section.eventLabel,
      options: section.choices,
      disabled,
      error: fieldErrors.event || "",
    })}
    ${renderTextarea({
      id: "rsvp-note",
      name: "note",
      label: section.fields.note,
      placeholder: section.notePlaceholder,
      maxlength: 400,
      disabled,
    })}
    ${renderPillArrowButton({ label: section.submitLabel, disabled })}
  </form>`;
}

function renderBlocked(state, copy) {
  return `<div class="rsvp-state rsvp-state--${escapeHtml(state)}" data-rsvp-state="${escapeHtml(state)}" role="status">
    <p class="rsvp-state__kicker">${escapeHtml(state)}</p>
    <h3>${escapeHtml(copy.title)}</h3>
    <p>${escapeHtml(copy.body)}</p>
  </div>`;
}

export function renderRsvp(section) {
  const state = STATE_ORDER.includes(section.state) || section.state === "ready" ? section.state : "ready";
  const blocked = state === "full" || state === "closed";
  const busy = state === "submitting" ? ` aria-busy="true"` : "";
  const errorClass = state === "error" ? " is-error" : "";
  const fieldErrors = state === "error"
    ? {
        summary: section.states.error.body,
        name: section.states.error.fields?.name || "",
        event: section.states.error.fields?.event || "",
      }
    : {};
  const live = blocked
    ? renderBlocked(state, section.states[state])
    : `${renderForm(section, state === "submitting", fieldErrors)}
        <div class="rsvp__success" role="status" aria-hidden="true">
          <h3 tabindex="-1" data-rsvp-success-title>${escapeHtml(section.successTitle)}</h3>
          <p data-rsvp-success-copy></p>
          ${renderPillArrowButton({
            label: section.resetLabel,
            type: "button",
            variant: "ghost",
            arrow: false,
            attributes: " data-rsvp-reset",
          })}
        </div>`;

  const previews = STATE_ORDER.map((id) => renderStateCard(id, section.states[id])).join("");

  return `<section class="section" id="${escapeHtml(section.id)}" aria-labelledby="rsvp-heading">
    <div class="wrap rsvp__layout">
      <div class="section__header">
        <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
        <h2 id="rsvp-heading">${escapeHtml(section.title)}</h2>
        <p>${escapeHtml(section.intro)}</p>
      </div>
      <div class="rsvp__panel${errorClass}" data-rsvp data-rsvp-state="${escapeHtml(state)}"${busy}>
        ${live}
      </div>
    </div>
    <div class="wrap rsvp-preview">
      <h3 id="rsvp-states-heading">${escapeHtml(section.statesTitle)}</h3>
      <p>${escapeHtml(section.statesIntro)}</p>
      <ul class="rsvp-states" aria-labelledby="rsvp-states-heading">${previews}</ul>
    </div>
  </section>`;
}

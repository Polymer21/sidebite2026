import { escapeHtml } from "../render/escape.js";
import { clampCount } from "../logic/stepper.js";

export function renderGuestCountStepper({
  id = "rsvp-guests",
  name = "guests",
  label,
  min = 1,
  max = 10,
  value = 1,
  hint = "",
  disabled = false,
}) {
  const minN = Number(min);
  const maxN = Number(max);
  const current = clampCount(value, minN, maxN) ?? minN;
  const described = [hint ? `${id}-hint` : "", `${id}-error`].filter(Boolean).join(" ");
  const hintHtml = hint
    ? `<p id="${escapeHtml(id)}-hint" class="field__hint">${escapeHtml(hint)}</p>`
    : "";
  const dis = disabled ? " disabled" : "";

  return `<div class="field stepper" data-component="guest-count-stepper" data-stepper data-min="${minN}" data-max="${maxN}">
    <label id="${escapeHtml(id)}-label" for="${escapeHtml(id)}">${escapeHtml(label)}</label>
    <div class="stepper__control">
      <button type="button" class="stepper__button" data-stepper-dec aria-label="Decrease ${escapeHtml(label)}"${dis}>−</button>
      <input id="${escapeHtml(id)}" class="stepper__value" name="${escapeHtml(name)}" type="text" inputmode="numeric" autocomplete="off" role="spinbutton" aria-valuemin="${minN}" aria-valuemax="${maxN}" aria-valuenow="${current}" aria-labelledby="${escapeHtml(id)}-label" aria-describedby="${escapeHtml(described)}" value="${current}"${dis} />
      <button type="button" class="stepper__button" data-stepper-inc aria-label="Increase ${escapeHtml(label)}"${dis}>+</button>
    </div>
    ${hintHtml}
    <p id="${escapeHtml(id)}-error" class="field__error" hidden></p>
  </div>`;
}

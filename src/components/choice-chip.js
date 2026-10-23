import { escapeHtml } from "../render/escape.js";

export function renderChoiceChips({ name, legend, options = [], disabled = false }) {
  const groupId = `${name}-group`;
  const selected = options.some((option) => option.selected);
  const chips = options
    .map((option, index) => {
      const id = `${name}-${option.value}`;
      const checked = option.selected || (!selected && index === 0) ? " checked" : "";
      const dis = disabled ? " disabled" : "";
      return `<label class="choice-chip" data-component="choice-chip" for="${escapeHtml(id)}">
        <input class="choice-chip__input" id="${escapeHtml(id)}" type="radio" name="${escapeHtml(name)}" value="${escapeHtml(option.value)}" aria-describedby="${escapeHtml(groupId)}-error"${checked}${dis} />
        <span>${escapeHtml(option.label)}</span>
      </label>`;
    })
    .join("");

  return `<fieldset class="choice-chips" id="${escapeHtml(groupId)}" data-choice-chips>
    <legend>${escapeHtml(legend)}</legend>
    <div class="choice-chips__list">${chips}</div>
    <p id="${escapeHtml(groupId)}-error" class="field__error" hidden></p>
  </fieldset>`;
}

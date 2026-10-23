import { escapeHtml } from "../render/escape.js";

export function renderChoiceChips({ name, legend, options = [], disabled = false, error = "" }) {
  const groupId = `${name}-group`;
  const selected = options.some((option) => option.selected);
  const chips = options
    .map((option, index) => {
      const id = `${name}-${option.value}`;
      const checked = option.selected || (!selected && index === 0 && !option.disabled) ? " checked" : "";
      const dis = disabled || option.disabled ? " disabled" : "";
      return `<label class="choice-chip" data-component="choice-chip" for="${escapeHtml(id)}">
        <input class="choice-chip__input" id="${escapeHtml(id)}" type="radio" name="${escapeHtml(name)}" value="${escapeHtml(option.value)}" aria-describedby="${escapeHtml(groupId)}-error"${checked}${dis} />
        <span>${escapeHtml(option.label)}</span>
      </label>`;
    })
    .join("");
  const invalid = error ? ` aria-invalid="true"` : "";
  const hidden = error ? "" : " hidden";

  return `<fieldset class="choice-chips" id="${escapeHtml(groupId)}" data-choice-chips${invalid}>
    <legend>${escapeHtml(legend)}</legend>
    <div class="choice-chips__list">${chips}</div>
    <p id="${escapeHtml(groupId)}-error" class="field__error"${hidden}>${escapeHtml(error)}</p>
  </fieldset>`;
}

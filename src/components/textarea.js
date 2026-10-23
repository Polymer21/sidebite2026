import { escapeHtml } from "../render/escape.js";

export function renderTextarea({
  id,
  name,
  label,
  placeholder = "",
  maxlength = 400,
  required = false,
  disabled = false,
}) {
  const req = required ? " required" : "";
  const dis = disabled ? " disabled" : "";
  const place = placeholder ? ` placeholder="${escapeHtml(placeholder)}"` : "";
  return `<div class="field">
    <label for="${escapeHtml(id)}">${escapeHtml(label)}</label>
    <textarea id="${escapeHtml(id)}" data-component="textarea" class="textarea" name="${escapeHtml(name)}" maxlength="${Number(maxlength)}" aria-describedby="${escapeHtml(id)}-error"${place}${req}${dis}></textarea>
    <p id="${escapeHtml(id)}-error" class="field__error" hidden></p>
  </div>`;
}

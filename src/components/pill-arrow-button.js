import { escapeHtml, safeHref } from "../render/escape.js";

export function renderPillArrowButton({
  label,
  href,
  type = "submit",
  disabled = false,
  variant = "",
  arrow = true,
  attributes = "",
}) {
  const classes = ["pill-arrow", variant === "ghost" ? "pill-arrow--ghost" : ""]
    .filter(Boolean)
    .join(" ");
  const icon = arrow ? `<span class="pill-arrow__icon" aria-hidden="true">→</span>` : "";
  const text = `<span class="pill-arrow__label">${escapeHtml(label)}</span>${icon}`;

  if (href) {
    return `<a class="${classes}" data-component="pill-arrow" href="${safeHref(href)}">${text}</a>`;
  }

  const dis = disabled ? " disabled" : "";
  return `<button class="${classes}" data-component="pill-arrow" type="${escapeHtml(type)}"${dis}${attributes}>${text}</button>`;
}

import { escapeHtml, safeHref } from "../render/escape.js";

export function renderNav(items) {
  const links = items
    .map(
      (item) =>
        `<li><a href="${safeHref(item.href)}">${escapeHtml(item.label)}</a></li>`,
    )
    .join("");

  return `<nav class="site-nav" id="site-nav" aria-label="Primary">
    <ul>${links}</ul>
  </nav>`;
}

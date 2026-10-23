import { escapeHtml } from "../render/escape.js";
import { renderNav } from "./nav.js";

export function renderTopBar(content) {
  return `<header class="topbar" data-component="top-bar">
    <div class="topbar__inner">
      <a class="logo" href="#top">${escapeHtml(content.logo)}</a>
      <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="site-nav">
        <span class="nav-toggle__label">Menu</span>
      </button>
      ${renderNav(content.nav)}
    </div>
  </header>`;
}

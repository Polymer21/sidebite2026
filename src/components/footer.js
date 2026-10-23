import { escapeHtml, safeHref } from "../render/escape.js";

export function renderFooter(content) {
  const links = content.nav
    .map(
      (item) =>
        `<li><a href="${safeHref(item.href)}">${escapeHtml(item.label)}</a></li>`,
    )
    .join("");

  const palettes = content.footer.palettes
    .map((palette) => {
      const pressed = palette.id === content.palette ? "true" : "false";
      return `<button type="button" data-palette-option="${escapeHtml(palette.id)}" aria-pressed="${pressed}">${escapeHtml(palette.label)}</button>`;
    })
    .join("");

  return `<footer class="site-footer">
    <div class="wrap footer__grid">
      <div>
        <p class="footer__brand">${escapeHtml(content.logo)}</p>
        <p class="footer__blurb">${escapeHtml(content.footer.blurb)}</p>
      </div>
      <nav aria-label="Footer">
        <ul class="footer__links">${links}</ul>
      </nav>
      <fieldset class="palette-switch">
        <legend>${escapeHtml(content.footer.paletteLegend)}</legend>
        <div class="palette-switch__options">${palettes}</div>
      </fieldset>
    </div>
  </footer>`;
}

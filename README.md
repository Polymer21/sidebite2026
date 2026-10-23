# Sidebite

Marketing landing page for Sidebite, which sells automated landing pages and RSVP forms for any event. This repo is the shared starting point: one static page now, and a content-driven layout later event sites can reuse.

The hero follows the Sidebite Premium template. It is a full-bleed slider, 860px tall from 760px wide and 720px tall below that. The top bar, headline, and call to action stay in place while three color slides crossfade underneath. Real photos can replace the colors later; a scrim behind the copy keeps the type at WCAG AA contrast.

## Structure

```
index.html                 Document shell. Copy is injected at build time.
vite.config.js             Base path /sidebite2026/ and the HTML plugin.
src/content/marketing.js   Copy, slides, and the default palette.
src/content/pages.js       Maps an HTML file to a content object.
src/components/            Nav, header, hero slider, sections, RSVP, footer.
src/render/page.js         Composes a page from a content object.
src/behaviors/             Slider, menu, palette switch, RSVP validation.
src/logic/                 Slide timing and form rules, covered by tests.
src/styles/tokens.css      Palettes. The only file with color values.
src/styles/                Layout, type, hero, and sections.
public/                    Favicon and other files copied as-is.
```

`renderPage(content)` is the reuse point. A later event template is another content object with the same shape (hero, how it works, event types, RSVP, footer). Register it in `src/content/pages.js` when a second HTML entry is added. Hero slides accept `src` and `alt` when a photo replaces a color field. Put image files in `public/` and use a relative path such as `photos/night.jpg` (no leading slash) so it resolves on GitHub Pages.

Visible marketing lines are marked “Placeholder” so they are not mistaken for final copy.

## Develop

Requires Node 20 or newer.

```bash
npm install
npm test
npm run dev
```

Open [http://localhost:5173/sidebite2026/](http://localhost:5173/sidebite2026/).

```bash
npm run build
npm run preview
```

The production preview is [http://127.0.0.1:4173/sidebite2026/](http://127.0.0.1:4173/sidebite2026/). `npm run build` writes `dist/`.

## Palettes

Set `data-palette` on `<html>` to switch every color. Components only reference role tokens such as `var(--color-bg-page)`, `var(--color-text-primary)`, `var(--color-accent)`, `var(--color-text-on-hero)`, and `var(--color-bg-footer)`.

| Value | Name | Notes |
| --- | --- | --- |
| `a` | TripleTee | Cream `#F3EFE7`, forest `#1A3820`, green `#426849`, olive `#656E4F`, sage `#929578`, oak `#866D4F`, tan `#B0977C`, stone `#D8D1C4`, ink `#222523`, small text `#81694C`. Sage and tan are decorative fills; they are not used for text. |
| `b` | Default | Neutral gray and charcoal, checked to WCAG AA. |
| `c` | Premium | Earthy taupe. This is the default, matching the Premium hero reference. |

The default comes from `palette` in `src/content/marketing.js`. The footer switcher sets the same attribute in the browser. Adding `?palette=a` (or `b` or `c`) to the URL does too.

Headings use Figtree. Body text uses Nunito Sans. Both are self-hosted variable fonts.

## Hero behavior

- Three slides, looping 1 → 2 → 3 → 1.
- Crossfade is 600ms, `ease-in-out`.
- Autoplay waits 5 seconds per slide.
- Autoplay pauses while the pointer is over the hero or focus is inside it, and while the tab is in the background.
- `prefers-reduced-motion: reduce` turns autoplay off and drops the fade.
- Controls are three 8px dots at the bottom right. Touch swipes change slides. There are no arrows.
- Slides are palette colors for now. The scrim stays put so headline contrast does not depend on the photo.

## RSVP demo

The form checks name, email, and guest count in the browser. Errors are tied to the fields. A valid submit replaces the form with a success message in the same card. Nothing is sent to a server.

## Deploy to GitHub Pages

Asset URLs use the Vite base `/sidebite2026/`, which matches this repository name. If the repository is renamed, change `base` in `vite.config.js`.

1. Push the project to GitHub.
2. In the repository settings, open Pages → Build and deployment, and choose GitHub Actions.
3. `.github/workflows/pages.yml` runs the tests, builds `dist/`, and deploys on every push to `main`.

The site is served at `https://<user>.github.io/sidebite2026/`.

## Accessibility

The page uses semantic regions, a skip link, visible focus, labeled fields, and text that stays at least 4.5:1 on the page, cards, footer, and hero scrim (including a white photo under the scrim). `npm test` checks those pairs, the TripleTee values, and that component CSS does not contain raw colors.

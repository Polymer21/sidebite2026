# Sidebite

Marketing landing page for Sidebite, which sells automated landing pages and RSVP forms for any event. This repo is the shared starting point: one static page now, and a content-driven layout later event sites can reuse.

The hero follows the Sidebite Premium template. It is a full-bleed slider, 860px tall from 760px wide and 720px tall below that. The top bar, headline, and call to action stay in place while three color slides crossfade underneath. Real photos can replace the colors later; a scrim behind the copy keeps the type at WCAG AA contrast.

## Structure

```
index.html                 Document shell. Copy is injected at build time.
vite.config.js             Base path /sidebite2026/ and the HTML plugin.
src/content/marketing.js   Copy, slides, and the default palette.
src/content/pages.js       Maps an HTML file to a content object.
src/components/            Top bar, hero, schedule, FAQ, RSVP fields, footer.
src/render/page.js         Composes a page from a content object.
src/behaviors/             Slider, menu, palette switch, stepper, FAQ, RSVP.
src/logic/                 Slide timing, guest stepper, and form rules.
src/styles/tokens.css      32 Figma Palette colors per mode, plus the focus-ring alias.
src/styles/themes.css      Font and radius tokens from the Figma Theme collection.
src/styles/                Layout, type, hero, shared components, and sections.
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

## Palettes and themes

Set `data-palette` on `<html>` to switch every color and the type theme together. Components only reference role tokens such as `var(--color-bg-page)`, `var(--color-accent-hover)`, `var(--color-text-error)`, `var(--color-border-focus)`, and `var(--font-display)`.

`src/styles/tokens.css` matches the Figma Palette collection: 32 color values for each mode, including hover, pressed, disabled, border, error, and focus. `color/focus-ring` is an alias of `color/border/focus` (`--color-focus-ring`).

| Value | Palette | Theme fonts |
| --- | --- | --- |
| `a` | TripleTee | Halloween: Figtree for display, Nunito Sans for text |
| `b` | Default | Default: Bricolage Grotesque for display, Inter for text |
| `c` | Premium | Premium: Fraunces for display, Inter for text. This is the marketing default. |

The default comes from `palette` in `src/content/marketing.js`. The footer switcher sets the same attribute in the browser. Adding `?palette=a` (or `b` or `c`) to the URL does too.

Font families and weights live in `src/styles/themes.css`. The files are self-hosted variable fonts. Premium does not use the Halloween families.

## Hero behavior

- Three slides, looping 1 → 2 → 3 → 1.
- Crossfade is 600ms, `ease-in-out`.
- Autoplay waits 5 seconds per slide.
- Autoplay pauses while the pointer is over the hero or focus is inside it, and while the tab is in the background.
- `prefers-reduced-motion: reduce` turns autoplay off and drops the fade.
- Controls are three 8px dots at the bottom right. From 759px wide and below, each dot keeps that 8px mark inside a 44px hit area. Touch swipes change slides. There are no arrows.
- Slides use palette colors. A band of `--color-bg-hero-start` sits behind the headline so the hero text tokens keep their contrast. The logo and footer links also grow to a 44px target at that width.

## Shared blocks

The page is built from TopBar, PillArrowButton, ScheduleRow, FAQItem, Textarea, ChoiceChip, and GuestCountStepper. The stepper replaces the free-text guest field. It keeps a minimum and maximum from the content config and moves with the arrow keys, Home, and End. FAQ items are buttons with `aria-expanded` and `aria-controls`.

## RSVP demo

The form checks name, email, event type, an optional note, and guest count in the browser. Errors are tied to the fields. A valid submit passes through Submitting, then replaces the form with a success message in the same card. Nothing is sent to a server.

`rsvp.state` in the content config is `ready`, `submitting`, `full`, or `closed`. Full and Closed replace the form. The marketing page stays on `ready` and also renders Submitting, Full, and Closed from `rsvp.states` so those states can be reviewed on the page.

## Deploy to GitHub Pages

Asset URLs use the Vite base `/sidebite2026/`, which matches this repository name. If the repository is renamed, change `base` in `vite.config.js`.

1. Push the project to GitHub.
2. In the repository settings, open Pages → Build and deployment, and choose GitHub Actions.
3. `.github/workflows/pages.yml` runs the tests, builds `dist/`, and deploys on every push to `main`.

The site is served at `https://<user>.github.io/sidebite2026/`.

## Accessibility

The page uses semantic regions, a skip link, visible focus, labeled fields, a guest spinbutton, and disclosures. Text that the layout uses stays at least 4.5:1 on the page, cards, footer, and hero. `npm test` checks the 32 Figma colors, those pairs, the theme fonts, the 44px targets, and that component CSS does not contain raw colors.

import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const tokens = readFileSync(new URL("../src/styles/tokens.css", import.meta.url), "utf8");
const themes = readFileSync(new URL("../src/styles/themes.css", import.meta.url), "utf8");
const base = readFileSync(new URL("../src/styles/base.css", import.meta.url), "utf8");
const hero = readFileSync(new URL("../src/styles/hero.css", import.meta.url), "utf8");
const sections = readFileSync(new URL("../src/styles/sections.css", import.meta.url), "utf8");

const expected = {
  a: {
    "--color-bg-page": "#fcfbfa",
    "--color-bg-section": "#f7f6f3",
    "--color-bg-surface": "#d8d1c4",
    "--color-bg-input": "#fcfbfa",
    "--color-bg-muted": "#d8d1c4",
    "--color-bg-footer": "#1a3820",
    "--color-accent": "#426849",
    "--color-accent-subtle": "#f0f3f0",
    "--color-text-primary": "#1a3820",
    "--color-text-secondary": "#656e4f",
    "--color-text-on-accent": "#fcfbfa",
    "--color-text-accent": "#426849",
    "--color-border-default": "#656e4f",
    "--color-bg-hero-start": "#f0eee9",
    "--color-accent-hover": "#2e4933",
    "--color-text-placeholder": "#505242",
    "--color-text-error": "#b42318",
    "--color-border-input": "#656e4f",
    "--color-border-focus": "#426849",
    "--color-border-error": "#b42318",
    "--color-text-on-footer": "#e8e4dd",
    "--color-text-on-footer-accent": "#c0c2b1",
    "--color-accent-pressed": "#243928",
    "--color-bg-disabled": "#f0eee9",
    "--color-text-disabled": "#77736c",
    "--color-border-disabled": "#d8d1c4",
    "--color-text-secondary-on-surface": "#383c2b",
    "--color-text-accent-on-surface": "#2e4933",
    "--color-text-on-hero": "#1a3820",
    "--color-text-accent-on-hero": "#426849",
    "--color-text-secondary-on-hero": "#656e4f",
    "--color-text-on-dark-surface": "#e8e4dd",
  },
  b: {
    "--color-bg-page": "#ffffff",
    "--color-bg-section": "#f7f7f8",
    "--color-bg-surface": "#ffffff",
    "--color-bg-input": "#ffffff",
    "--color-bg-muted": "#e4e4e7",
    "--color-bg-footer": "#18181b",
    "--color-accent": "#2563eb",
    "--color-accent-subtle": "#dbeafe",
    "--color-text-primary": "#18181b",
    "--color-text-secondary": "#52525b",
    "--color-text-on-accent": "#ffffff",
    "--color-text-accent": "#1d4ed8",
    "--color-border-default": "#71717a",
    "--color-bg-hero-start": "#dbeafe",
    "--color-accent-hover": "#1d4ed8",
    "--color-text-placeholder": "#52525b",
    "--color-text-error": "#dc2626",
    "--color-border-input": "#71717a",
    "--color-border-focus": "#2563eb",
    "--color-border-error": "#dc2626",
    "--color-text-on-footer": "#e4e4e7",
    "--color-text-on-footer-accent": "#dbeafe",
    "--color-accent-pressed": "#1e40af",
    "--color-bg-disabled": "#f4f4f5",
    "--color-text-disabled": "#6b7280",
    "--color-border-disabled": "#e4e4e7",
    "--color-text-secondary-on-surface": "#52525b",
    "--color-text-accent-on-surface": "#1d4ed8",
    "--color-text-on-hero": "#18181b",
    "--color-text-accent-on-hero": "#1d4ed8",
    "--color-text-secondary-on-hero": "#52525b",
    "--color-text-on-dark-surface": "#e4e4e7",
  },
  c: {
    "--color-bg-page": "#f4efe6",
    "--color-bg-section": "#ece5d8",
    "--color-bg-surface": "#fbf8f2",
    "--color-bg-input": "#fbf8f2",
    "--color-bg-muted": "#e4dccd",
    "--color-bg-footer": "#e4dccd",
    "--color-accent": "#4f5b43",
    "--color-accent-subtle": "#e4e6da",
    "--color-text-primary": "#26221d",
    "--color-text-secondary": "#5b5246",
    "--color-text-on-accent": "#fbf8f2",
    "--color-text-accent": "#4f5b43",
    "--color-border-default": "#8a7f70",
    "--color-bg-hero-start": "#6f6658",
    "--color-accent-hover": "#3e4834",
    "--color-text-placeholder": "#6e6558",
    "--color-text-error": "#9a3324",
    "--color-border-input": "#7c7163",
    "--color-border-focus": "#4f5b43",
    "--color-border-error": "#9a3324",
    "--color-text-on-footer": "#26221d",
    "--color-text-on-footer-accent": "#4f5b43",
    "--color-accent-pressed": "#333b2b",
    "--color-bg-disabled": "#e4dccd",
    "--color-text-disabled": "#7a7062",
    "--color-border-disabled": "#b8ae9f",
    "--color-text-secondary-on-surface": "#5b5246",
    "--color-text-accent-on-surface": "#4f5b43",
    "--color-text-on-hero": "#fbf8f2",
    "--color-text-accent-on-hero": "#ffffff",
    "--color-text-secondary-on-hero": "#fbf8f2",
    "--color-text-on-dark-surface": "#26221d",
  },
};

const textPairs = [
  ["--color-text-primary", "--color-bg-page"],
  ["--color-text-secondary", "--color-bg-page"],
  ["--color-text-primary", "--color-bg-section"],
  ["--color-text-secondary", "--color-bg-section"],
  ["--color-text-primary", "--color-bg-surface"],
  ["--color-text-secondary-on-surface", "--color-bg-surface"],
  ["--color-text-accent-on-surface", "--color-bg-surface"],
  ["--color-text-on-accent", "--color-accent"],
  ["--color-text-on-accent", "--color-accent-hover"],
  ["--color-text-on-accent", "--color-accent-pressed"],
  ["--color-text-error", "--color-bg-page"],
  ["--color-text-error", "--color-bg-input"],
  ["--color-text-on-footer", "--color-bg-footer"],
  ["--color-text-on-footer-accent", "--color-bg-footer"],
  ["--color-text-on-hero", "--color-bg-hero-start"],
  ["--color-text-secondary-on-hero", "--color-bg-hero-start"],
  ["--color-text-accent-on-hero", "--color-bg-hero-start"],
  ["--color-text-placeholder", "--color-bg-input"],
];

const borderPairs = [
  ["--color-border-default", "--color-bg-page"],
  ["--color-border-default", "--color-bg-surface"],
  ["--color-border-input", "--color-bg-input"],
  ["--color-border-focus", "--color-bg-page"],
  ["--color-border-error", "--color-bg-input"],
];

function lin(channel) {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function lum(hex) {
  const h = hex.replace("#", "");
  const r = Number.parseInt(h.slice(0, 2), 16);
  const g = Number.parseInt(h.slice(2, 4), 16);
  const b = Number.parseInt(h.slice(4, 6), 16);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(foreground, background) {
  const lighter = Math.max(lum(foreground), lum(background));
  const darker = Math.min(lum(foreground), lum(background));
  return (lighter + 0.05) / (darker + 0.05);
}

function paletteBlock(id) {
  const match = tokens.match(new RegExp(`:root\\[data-palette="${id}"\\]\\s*\\{([^}]+)\\}`));
  assert.ok(match, `missing palette ${id}`);
  const values = {};
  for (const line of match[1].split("\n")) {
    const token = line.match(/(--color-[\w-]+):\s*(#[0-9a-fA-F]{6})/);
    if (token) values[token[1]] = token[2].toLowerCase();
  }
  return { source: match[1], values };
}

function themeBlock(id) {
  const match = themes.match(new RegExp(`:root\\[data-palette="${id}"\\]\\s*\\{([^}]+)\\}`));
  assert.ok(match, `missing theme ${id}`);
  return match[1];
}

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path, files);
    else files.push(path);
  }
  return files;
}

test("each palette matches the 32 Figma color tokens and clears AA", () => {
  assert.match(tokens, /--color-focus-ring:\s*var\(--color-border-focus\)/);
  assert.equal(tokens.match(/--color-focus-ring/g).length, 1);

  for (const id of ["a", "b", "c"]) {
    const { source, values } = paletteBlock(id);
    const declarations = source.split("\n").filter((line) => line.includes("--color-"));
    assert.equal(declarations.length, 32, `palette ${id} should declare 32 color tokens`);
    assert.equal(Object.keys(values).length, 32);
    assert.deepEqual(values, expected[id]);
    for (const [foreground, background] of textPairs) {
      const ratio = contrast(values[foreground], values[background]);
      assert.ok(ratio >= 4.5, `${id} ${foreground} on ${background} is ${ratio.toFixed(2)}`);
    }
    for (const [foreground, background] of borderPairs) {
      const ratio = contrast(values[foreground], values[background]);
      assert.ok(ratio >= 3, `${id} ${foreground} on ${background} is ${ratio.toFixed(2)}`);
    }
  }
});

test("component styles do not hardcode colors", () => {
  const root = new URL("..", import.meta.url).pathname;
  const files = walk(join(root, "src")).filter((file) => /\.(css|js)$/.test(file));
  const offenders = [];
  for (const file of files) {
    if (file.endsWith("tokens.css")) continue;
    const source = readFileSync(file, "utf8");
    if (/#[0-9a-fA-F]{3,8}\b/.test(source)) offenders.push(file);
  }
  assert.deepEqual(offenders, []);
});

test("theme fonts follow the palette and components use the tokens", () => {
  const premium = themeBlock("c");
  const halloween = themeBlock("a");
  const neutral = themeBlock("b");
  assert.match(premium, /Fraunces/);
  assert.match(premium, /"Inter"/);
  assert.doesNotMatch(premium, /Figtree|Nunito Sans/);
  assert.match(halloween, /Figtree/);
  assert.match(halloween, /Nunito Sans/);
  assert.match(neutral, /Bricolage Grotesque/);
  assert.match(neutral, /"Inter"/);
  assert.match(base, /var\(--font-display\)/);
  assert.match(base, /var\(--font-body\)/);
  assert.match(base, /var\(--font-weight-display\)/);

  const root = new URL("..", import.meta.url).pathname;
  const files = walk(join(root, "src")).filter((file) => file.endsWith(".css"));
  const offenders = [];
  for (const file of files) {
    if (file.endsWith("themes.css") || file.endsWith("fonts.css")) continue;
    const source = readFileSync(file, "utf8");
    if (/Figtree|Nunito Sans|Fraunces|Bricolage Grotesque|"Inter"/.test(source)) offenders.push(file);
  }
  assert.deepEqual(offenders, []);
});

test("the hero keeps the specified size, timing, and dot treatment", () => {
  assert.match(base, /--hero-height:\s*720px/);
  assert.match(base, /--hero-height:\s*860px/);
  assert.match(base, /--hero-fade:\s*600ms/);
  assert.match(hero, /ease-in-out/);
  assert.match(hero, /width:\s*8px/);
  assert.match(hero, /height:\s*8px/);
  assert.match(hero, /prefers-reduced-motion|var\(--hero-fade\)/);
});

test("chips, disclosures, and the RSVP error state use palette tokens", () => {
  const components = readFileSync(new URL("../src/styles/components.css", import.meta.url), "utf8");
  assert.match(components, /\.choice-chip:hover\s*\{[^}]*var\(--color-text-secondary\)/);
  assert.match(components, /\.choice-chip:active\s*\{[^}]*var\(--color-bg-muted\)/);
  assert.match(components, /\.choice-chip:has\(:disabled\)[\s\S]*var\(--color-bg-disabled\)/);
  assert.match(components, /\.choice-chip:has\(:disabled\)[\s\S]*var\(--color-text-disabled\)/);
  assert.match(components, /\.choice-chip:has\(:disabled\)[\s\S]*var\(--color-border-disabled\)/);
  assert.match(components, /\.faq-item__trigger:hover\s*\{[^}]*var\(--color-accent-subtle\)/);
  assert.match(components, /\.faq-item__trigger:active\s*\{[^}]*var\(--color-bg-muted\)/);
  assert.match(components, /\.schedule-row:has\(\.schedule-row__trigger:hover\)\s*\{[^}]*var\(--color-accent-subtle\)/);
  assert.match(components, /\.schedule-row:has\(\.schedule-row__trigger:active\)\s*\{[^}]*var\(--color-bg-muted\)/);
  assert.match(components, /\.schedule-row:has\(\[aria-expanded="true"\]\)\s*\{[^}]*background:\s*transparent/);
  assert.match(components, /\.schedule-row:has\(\[aria-expanded="true"\]\)\s*\{[^}]*var\(--color-border-input\)/);
  assert.match(components, /\.schedule-row__number\s*\{[^}]*var\(--color-text-accent\)/);
  assert.match(components, /\.schedule-row__time\s*\{[^}]*var\(--color-text-secondary\)/);
  assert.match(components, /\.schedule-row__panel\s*\{[^}]*var\(--color-text-secondary\)/);
  assert.doesNotMatch(components, /padding:\s*0 1rem 1rem 4\.75rem/);
  assert.match(components, /\.choice-chip:has\(:checked\)\s*\{[^}]*border-width:\s*2px/);
  assert.match(components, /\.choice-chip:has\(:checked\):hover\s*\{[^}]*var\(--color-accent\)/);
  assert.doesNotMatch(components, /\.choice-chip:has\(:checked\):hover\s*\{[^}]*accent-hover/);
  assert.match(components, /\.faq-item__trigger:focus-visible\s*\{[^}]*outline-offset:\s*-3px/);
  assert.match(components, /\.schedule-row__trigger:focus-visible\s*\{[^}]*outline-offset:\s*-3px/);
  assert.match(components, /\.rsvp-state--error\s*\{[^}]*var\(--color-border-error\)/);
  assert.match(components, /\.rsvp-state--error h3,\s*\.rsvp-state--error p\s*\{[^}]*var\(--color-text-error\)/);
});

test("at 390px the logo, hero dots, and footer links have a 44px target", () => {
  const heroMobile = hero.slice(hero.indexOf("@media (max-width: 759px)"));
  assert.match(heroMobile, /\.logo\s*\{[^}]*min-height:\s*44px/);
  assert.match(heroMobile, /\.hero__dot\s*\{[^}]*width:\s*44px;\s*height:\s*44px/);
  assert.match(heroMobile, /width:\s*8px;\s*height:\s*8px/);
  const footerMobile = sections.slice(sections.indexOf("@media (max-width: 759px)"));
  assert.match(footerMobile, /\.site-footer a\s*\{[^}]*min-height:\s*44px/);
});

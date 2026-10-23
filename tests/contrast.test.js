import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const tokens = readFileSync(new URL("../src/styles/tokens.css", import.meta.url), "utf8");
const base = readFileSync(new URL("../src/styles/base.css", import.meta.url), "utf8");
const hero = readFileSync(new URL("../src/styles/hero.css", import.meta.url), "utf8");

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

function composite(foreground, background, alpha) {
  const parse = (hex) => {
    const h = hex.replace("#", "");
    return [0, 2, 4].map((start) => Number.parseInt(h.slice(start, start + 2), 16));
  };
  const [fr, fg, fb] = parse(foreground);
  const [br, bg, bb] = parse(background);
  const mix = (front, back) => Math.round(front * alpha + back * (1 - alpha));
  return `#${[mix(fr, br), mix(fg, bg), mix(fb, bb)].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
}

function paletteBlock(id) {
  const match = tokens.match(new RegExp(`:root\\[data-palette="${id}"\\]\\s*\\{([^}]+)\\}`));
  assert.ok(match, `missing palette ${id}`);
  const values = {};
  for (const line of match[1].split("\n")) {
    const token = line.match(/(--color-[\w-]+):\s*(#[0-9a-fA-F]{6})/);
    if (token) values[token[1]] = token[2].toLowerCase();
  }
  return values;
}

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path, files);
    else files.push(path);
  }
  return files;
}

const required = [
  "--color-bg-page",
  "--color-bg-surface",
  "--color-text-primary",
  "--color-text-secondary",
  "--color-accent",
  "--color-text-on-accent",
  "--color-border",
  "--color-bg-footer",
  "--color-text-on-dark-surface",
  "--color-text-secondary-on-dark-surface",
  "--color-bg-hero-start",
  "--color-bg-hero-slide-1",
  "--color-bg-hero-slide-2",
  "--color-bg-hero-slide-3",
  "--color-text-on-hero",
  "--color-text-secondary-on-hero",
  "--color-scrim-base",
  "--color-focus",
  "--color-focus-on-hero",
  "--color-text-danger",
  "--color-fill-soft",
  "--color-fill-warm",
];

const textPairs = [
  ["--color-text-primary", "--color-bg-page"],
  ["--color-text-secondary", "--color-bg-page"],
  ["--color-text-primary", "--color-bg-surface"],
  ["--color-text-secondary", "--color-bg-surface"],
  ["--color-text-on-accent", "--color-accent"],
  ["--color-text-on-dark-surface", "--color-bg-footer"],
  ["--color-text-secondary-on-dark-surface", "--color-bg-footer"],
  ["--color-text-danger", "--color-bg-page"],
  ["--color-text-danger", "--color-bg-surface"],
  ["--color-focus", "--color-bg-page"],
];

test("each palette defines the role tokens and clears AA", () => {
  const cover = Number.parseFloat(tokens.match(/--scrim-cover:\s*([0-9.]+)%/)[1]) / 100;
  assert.ok(cover >= 0.78);

  for (const id of ["a", "b", "c"]) {
    const colors = paletteBlock(id);
    for (const token of required) {
      assert.ok(colors[token], `palette ${id} missing ${token}`);
    }
    for (const [foreground, background] of textPairs) {
      const ratio = contrast(colors[foreground], colors[background]);
      assert.ok(ratio >= 4.5, `${id} ${foreground} on ${background} is ${ratio.toFixed(2)}`);
    }
    for (const surface of ["--color-bg-page", "--color-bg-surface"]) {
      const ratio = contrast(colors["--color-border"], colors[surface]);
      assert.ok(ratio >= 3, `${id} border on ${surface} is ${ratio.toFixed(2)}`);
    }

    const scrim = composite(colors["--color-scrim-base"], "#ffffff", cover);
    for (const foreground of ["--color-text-on-hero", "--color-text-secondary-on-hero"]) {
      const ratio = contrast(colors[foreground], scrim);
      assert.ok(ratio >= 4.5, `${id} ${foreground} on scrim is ${ratio.toFixed(2)}`);
    }

    const hover = composite(colors["--color-accent"], colors["--color-shade"] ?? "#000000", 0.86);
    const hoverRatio = contrast(colors["--color-text-on-accent"], hover);
    assert.ok(hoverRatio >= 4.5, `${id} accent hover is ${hoverRatio.toFixed(2)}`);
  }
});

test("palette a keeps the TripleTee brand colors", () => {
  const block = paletteBlock("a");
  const values = new Set(Object.values(block));
  for (const hex of [
    "#f3efe7",
    "#1a3820",
    "#426849",
    "#656e4f",
    "#929578",
    "#866d4f",
    "#b0977c",
    "#d8d1c4",
    "#222523",
    "#81694c",
  ]) {
    assert.ok(values.has(hex), `missing TripleTee color ${hex}`);
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

test("the hero keeps the specified size, timing, and dot treatment", () => {
  assert.match(base, /--hero-height:\s*720px/);
  assert.match(base, /--hero-height:\s*860px/);
  assert.match(base, /--hero-fade:\s*600ms/);
  assert.match(hero, /ease-in-out/);
  assert.match(hero, /width:\s*8px/);
  assert.match(hero, /height:\s*8px/);
  assert.match(hero, /prefers-reduced-motion|var\(--hero-fade\)/);
});

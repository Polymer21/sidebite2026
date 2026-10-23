import assert from "node:assert/strict";
import test from "node:test";
import { clampCount, countFromKey } from "../src/logic/stepper.js";
import { AUTOPLAY_MS, FADE_MS, indexFromKey, swipeDelta, wrapIndex } from "../src/logic/slider.js";
import { successCopy, validateRsvp } from "../src/logic/validate-rsvp.js";

test("slides loop 1-2-3-1", () => {
  assert.equal(wrapIndex(0, 3), 0);
  assert.equal(wrapIndex(1, 3), 1);
  assert.equal(wrapIndex(2, 3), 2);
  assert.equal(wrapIndex(3, 3), 0);
  assert.equal(wrapIndex(-1, 3), 2);
});

test("autoplay and fade match the hero spec", () => {
  assert.equal(AUTOPLAY_MS, 5000);
  assert.equal(FADE_MS, 600);
});

test("arrow keys move from the focused dot and loop", () => {
  assert.equal(indexFromKey(0, "ArrowRight", 3), 1);
  assert.equal(indexFromKey(2, "ArrowRight", 3), 0);
  assert.equal(indexFromKey(0, "ArrowLeft", 3), 2);
  assert.equal(indexFromKey(1, "Home", 3), 0);
  assert.equal(indexFromKey(0, "End", 3), 2);
  assert.equal(indexFromKey(1, "Enter", 3), null);
});

test("horizontal swipes move slides and vertical drags do not", () => {
  assert.equal(swipeDelta(-80, 10), 1);
  assert.equal(swipeDelta(80, 10), -1);
  assert.equal(swipeDelta(10, 0), 0);
  assert.equal(swipeDelta(-40, 80), 0);
  assert.equal(swipeDelta(48, 48), 0);
});

test("rsvp validation accepts a complete response and rejects empty fields", () => {
  const valid = validateRsvp({ name: "Ada Lovelace", email: "ada@example.com", guests: "2" });
  assert.equal(valid.ok, true);

  const empty = validateRsvp({ name: " ", email: "not-an-email", guests: "0" });
  assert.equal(empty.ok, false);
  assert.ok(empty.errors.name);
  assert.ok(empty.errors.email);
  assert.ok(empty.errors.guests);
});

test("the guest stepper stays inside min and max and responds to keys", () => {
  assert.equal(clampCount("2", 1, 10), 2);
  assert.equal(clampCount("0", 1, 10), 1);
  assert.equal(clampCount("14", 1, 10), 10);
  assert.equal(clampCount("nope", 1, 10), null);
  assert.equal(countFromKey("4", "ArrowUp", 1, 10), 5);
  assert.equal(countFromKey("4", "ArrowDown", 1, 10), 3);
  assert.equal(countFromKey("1", "ArrowDown", 1, 10), 1);
  assert.equal(countFromKey("10", "ArrowUp", 1, 10), 10);
  assert.equal(countFromKey("4", "Home", 1, 10), 1);
  assert.equal(countFromKey("4", "End", 1, 10), 10);
  assert.equal(countFromKey("", "ArrowUp", 1, 10), 1);
  assert.equal(countFromKey("4", "Enter", 1, 10), null);
});

test("success copy stays on the device and names the guest", () => {
  const copy = successCopy({ name: "Ada", guests: "1" });
  assert.match(copy, /Placeholder:/);
  assert.match(copy, /Ada/);
  assert.match(copy, /1 person/);
  assert.match(copy, /Nothing was sent/);
});

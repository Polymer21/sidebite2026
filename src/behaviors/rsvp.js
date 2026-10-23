import { successCopy, validateRsvp } from "../logic/validate-rsvp.js";

const FIELDS = ["name", "email", "guests", "event", "note"];

function controlFor(form, name) {
  const item = form.elements.namedItem(name);
  if (!item) return null;
  if (typeof item.setAttribute === "function") return item;
  return form.querySelector("#event-group");
}

function showError(input, message) {
  const error = input.ownerDocument.getElementById(`${input.id}-error`);
  input.setAttribute("aria-invalid", "true");
  if (input.matches?.("fieldset")) {
    for (const radio of input.querySelectorAll("input")) radio.setAttribute("aria-invalid", "true");
  }
  if (!error) return;
  error.textContent = message;
  error.hidden = false;
}

function clearError(input) {
  const error = input.ownerDocument.getElementById(`${input.id}-error`);
  input.removeAttribute("aria-invalid");
  if (input.matches?.("fieldset")) {
    for (const radio of input.querySelectorAll("input")) radio.removeAttribute("aria-invalid");
  }
  if (!error) return;
  error.textContent = "";
  error.hidden = true;
}

function focusControl(input) {
  if (!input) return;
  if (input.matches?.("fieldset")) {
    const radio = input.querySelector("input:checked") || input.querySelector("input");
    radio?.focus();
    return;
  }
  input.focus();
}

export function initRsvp(doc = document) {
  const panel = doc.querySelector("[data-rsvp]");
  if (!panel) return;
  const state = panel.dataset.rsvpState;
  if (state === "full" || state === "closed") return;

  const form = panel.querySelector("form");
  const success = panel.querySelector(".rsvp__success");
  const successCopyNode = panel.querySelector("[data-rsvp-success-copy]");
  const successTitle = panel.querySelector("[data-rsvp-success-title]");
  const reset = panel.querySelector("[data-rsvp-reset]");
  const status = panel.querySelector("[data-rsvp-status]");
  if (!form || !success || !successCopyNode || !successTitle) return;

  let submitted = false;
  let pending = 0;
  const view = doc.defaultView;

  function limits() {
    const stepper = form.querySelector("[data-stepper]");
    if (!stepper) return {};
    return { min: Number(stepper.dataset.min), max: Number(stepper.dataset.max) };
  }

  function values() {
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      guests: data.get("guests"),
    };
    if (form.elements.namedItem("note")) payload.note = data.get("note") ?? "";
    if (form.elements.namedItem("event")) payload.event = data.get("event") ?? "";
    return payload;
  }

  function renderErrors(result) {
    let firstInvalid = null;
    for (const name of FIELDS) {
      const input = controlFor(form, name);
      if (!input) continue;
      const message = result.errors[name];
      if (message) {
        showError(input, message);
        firstInvalid ??= input;
      } else {
        clearError(input);
      }
    }
    return firstInvalid;
  }

  function showSuccess(result) {
    successCopyNode.textContent = successCopy(result);
    form.inert = true;
    form.setAttribute("aria-hidden", "true");
    success.setAttribute("aria-hidden", "false");
    panel.classList.remove("is-submitting");
    panel.removeAttribute("aria-busy");
    if (status) status.hidden = true;
    panel.classList.add("is-success");
    successTitle.focus();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (panel.dataset.rsvpState === "submitting" || pending) return;
    submitted = true;
    const result = validateRsvp(values(), limits());
    const firstInvalid = renderErrors(result);
    if (!result.ok) {
      focusControl(firstInvalid);
      return;
    }

    panel.classList.add("is-submitting");
    panel.setAttribute("aria-busy", "true");
    if (status) status.hidden = false;
    const submit = form.querySelector("[type='submit']");
    if (submit) submit.disabled = true;
    const reduce = view.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    pending = view.setTimeout(() => {
      pending = 0;
      showSuccess(result);
    }, reduce ? 0 : 600);
  });

  form.addEventListener("input", (event) => {
    if (!submitted) return;
    const input = event.target;
    const editable =
      input instanceof view.HTMLInputElement || input instanceof view.HTMLTextAreaElement;
    if (!editable || !input.name) return;
    const result = validateRsvp(values(), limits());
    const target = input.name === "event" ? controlFor(form, "event") : input;
    const message = result.errors[input.name];
    if (!target) return;
    if (message) showError(target, message);
    else clearError(target);
  });

  reset?.addEventListener("click", () => {
    if (pending) view.clearTimeout(pending);
    pending = 0;
    form.reset();
    submitted = false;
    for (const name of FIELDS) {
      const input = controlFor(form, name);
      if (input) clearError(input);
    }
    const submit = form.querySelector("[type='submit']");
    if (submit) submit.disabled = false;
    panel.classList.remove("is-success", "is-submitting");
    panel.removeAttribute("aria-busy");
    if (status) status.hidden = true;
    form.inert = false;
    form.removeAttribute("aria-hidden");
    success.setAttribute("aria-hidden", "true");
    successCopyNode.textContent = "";
    form.elements.namedItem("name")?.focus();
  });
}

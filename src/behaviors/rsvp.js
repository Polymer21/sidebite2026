import { successCopy, validateRsvp } from "../logic/validate-rsvp.js";

const FIELDS = ["name", "email", "guests"];

function showError(input, message) {
  const error = document.getElementById(`${input.id}-error`);
  input.setAttribute("aria-invalid", "true");
  if (!error) return;
  error.textContent = message;
  error.hidden = false;
}

function clearError(input) {
  const error = document.getElementById(`${input.id}-error`);
  input.removeAttribute("aria-invalid");
  if (!error) return;
  error.textContent = "";
  error.hidden = true;
}

export function initRsvp(doc = document) {
  const panel = doc.querySelector("[data-rsvp]");
  if (!panel) return;
  const form = panel.querySelector("form");
  const success = panel.querySelector(".rsvp__success");
  const successCopyNode = panel.querySelector("[data-rsvp-success-copy]");
  const successTitle = panel.querySelector("[data-rsvp-success-title]");
  const reset = panel.querySelector("[data-rsvp-reset]");
  if (!form || !success || !successCopyNode || !successTitle) return;

  let submitted = false;

  function values() {
    const data = new FormData(form);
    return {
      name: data.get("name"),
      email: data.get("email"),
      guests: data.get("guests"),
    };
  }

  function renderErrors(result) {
    let firstInvalid = null;
    for (const name of FIELDS) {
      const input = form.elements.namedItem(name);
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

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitted = true;
    const result = validateRsvp(values());
    const firstInvalid = renderErrors(result);
    if (!result.ok) {
      firstInvalid?.focus();
      return;
    }

    successCopyNode.textContent = successCopy(result);
    form.inert = true;
    form.setAttribute("aria-hidden", "true");
    success.setAttribute("aria-hidden", "false");
    panel.classList.add("is-success");
    successTitle.focus();
  });

  form.addEventListener("input", (event) => {
    if (!submitted) return;
    const input = event.target;
    if (!(input instanceof doc.defaultView.HTMLInputElement)) return;
    const result = validateRsvp(values());
    const message = result.errors[input.name];
    if (message) showError(input, message);
    else clearError(input);
  });

  reset?.addEventListener("click", () => {
    form.reset();
    submitted = false;
    for (const name of FIELDS) {
      const input = form.elements.namedItem(name);
      if (input) clearError(input);
    }
    panel.classList.remove("is-success");
    form.inert = false;
    form.removeAttribute("aria-hidden");
    success.setAttribute("aria-hidden", "true");
    successCopyNode.textContent = "";
    form.elements.namedItem("name")?.focus();
  });
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRsvp(values, limits = {}) {
  const errors = {};
  const name = String(values.name ?? "").trim();
  const email = String(values.email ?? "").trim();
  const guests = String(values.guests ?? "").trim();
  const min = Number.isFinite(Number(limits.min)) ? Number(limits.min) : 1;
  const max = Number.isFinite(Number(limits.max)) ? Number(limits.max) : 10;
  const range = `Enter a whole number from ${min} to ${max}.`;

  if (!name) errors.name = "Enter your name.";
  else if (name.length > 80) errors.name = "Use 80 characters or fewer.";

  if (!email) errors.email = "Enter your email.";
  else if (!EMAIL.test(email)) errors.email = "Enter an email address with an @ and a domain.";

  if (!guests) errors.guests = "Enter how many people are coming.";
  else if (!/^\d+$/.test(guests)) errors.guests = range;
  else {
    const count = Number(guests);
    if (count < min || count > max) errors.guests = range;
  }

  if ("event" in values && !String(values.event ?? "").trim()) {
    errors.event = "Choose an event type.";
  }

  if ("note" in values && String(values.note ?? "").length > 400) {
    errors.note = "Use 400 characters or fewer.";
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    name,
    email,
    guests,
  };
}

export function successCopy({ name, guests }) {
  const count = Number(guests);
  const people = count === 1 ? "1 person" : `${count} people`;
  return `Placeholder: ${name} is down for ${people}. Nothing was sent. This demo stays in the browser.`;
}

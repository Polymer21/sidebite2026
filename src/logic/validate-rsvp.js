const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRsvp(values) {
  const errors = {};
  const name = String(values.name ?? "").trim();
  const email = String(values.email ?? "").trim();
  const guests = String(values.guests ?? "").trim();

  if (!name) errors.name = "Enter your name.";
  else if (name.length > 80) errors.name = "Use 80 characters or fewer.";

  if (!email) errors.email = "Enter your email.";
  else if (!EMAIL.test(email)) errors.email = "Enter an email address with an @ and a domain.";

  if (!guests) errors.guests = "Enter how many people are coming.";
  else if (!/^\d+$/.test(guests)) errors.guests = "Enter a whole number from 1 to 10.";
  else {
    const count = Number(guests);
    if (count < 1 || count > 10) errors.guests = "Enter a whole number from 1 to 10.";
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

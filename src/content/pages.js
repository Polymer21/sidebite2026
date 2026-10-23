import { marketing } from "./marketing.js";

/** Map a Vite HTML path to the content object that drives that page. */
export const pages = {
  "/index.html": marketing,
};

export function contentFor(path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const file = normalized.endsWith("index.html") ? "/index.html" : normalized;
  return pages[file] ?? marketing;
}

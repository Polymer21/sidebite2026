import { initNav } from "./behaviors/nav.js";
import { initPalette } from "./behaviors/palette.js";
import { initRsvp } from "./behaviors/rsvp.js";
import { initSlider } from "./behaviors/slider.js";

const hero = document.querySelector("[data-hero]");
if (hero) initSlider(hero);
initNav(document);
initPalette(document);
initRsvp(document);

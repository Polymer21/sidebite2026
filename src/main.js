import { initFaq } from "./behaviors/faq.js";
import { initNav } from "./behaviors/nav.js";
import { initPalette } from "./behaviors/palette.js";
import { initRsvp } from "./behaviors/rsvp.js";
import { initSlider } from "./behaviors/slider.js";
import { initSteppers } from "./behaviors/stepper.js";

const hero = document.querySelector("[data-hero]");
if (hero) initSlider(hero);
initNav(document);
initPalette(document);
initSteppers(document);
initRsvp(document);
initFaq(document);

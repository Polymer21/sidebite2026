import { escapeHtml, safeHref } from "../render/escape.js";

function renderSlide(slide, index) {
  const informative = Boolean(slide.src && slide.alt);
  const hidden = informative ? "" : ` data-decorative="true" aria-hidden="true"`;
  const image = slide.src
    ? `<img class="hero__image" src="${escapeHtml(slide.src)}" alt="${escapeHtml(slide.alt ?? "")}" />`
    : "";

  return `<div class="hero__slide${index === 0 ? " is-active" : ""}" data-slide="${index}" data-tone="${index + 1}"${hidden}>
    ${image}
  </div>`;
}

function renderDots(slides) {
  return slides
    .map((slide, index) => {
      const current = index === 0 ? ` aria-current="true"` : "";
      const label = `Show slide ${index + 1} of ${slides.length}`;
      return `<button type="button" class="hero__dot" data-hero-dot="${index}" aria-label="${escapeHtml(label)}"${current}></button>`;
    })
    .join("");
}

export function renderHero(hero) {
  const slides = hero.slides ?? [];
  const anyInformative = slides.some((slide) => slide.src && slide.alt);
  const slidesHidden = anyInformative ? "" : ` aria-hidden="true"`;

  return `<section class="hero" aria-roledescription="carousel" aria-labelledby="hero-title" style="--hero-fade: ${Number(hero.fadeMs) || 600}ms">
    <div class="hero__slides"${slidesHidden}>
      ${slides.map(renderSlide).join("")}
    </div>
    <div class="hero__scrim" aria-hidden="true"></div>
    <div class="hero__layout">
      <div class="hero__copy">
        <p class="eyebrow eyebrow--hero">${escapeHtml(hero.kicker)}</p>
        <h1 id="hero-title">${escapeHtml(hero.title)}</h1>
        <p class="lede">${escapeHtml(hero.lede)}</p>
        <p class="hero__cta">
          <a class="button" href="${safeHref(hero.cta.href)}">${escapeHtml(hero.cta.label)}<span class="button__icon" aria-hidden="true">→</span></a>
        </p>
      </div>
    </div>
    <div class="hero__dots">${renderDots(slides)}</div>
    <p class="visually-hidden" data-hero-live aria-live="polite"></p>
  </section>`;
}

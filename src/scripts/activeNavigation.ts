import { activeSection } from '../utils/activeSection';

const header = document.querySelector<HTMLElement>('.site-header');
const links = [...document.querySelectorAll<HTMLAnchorElement>('.site-navigation a[href^="#"]')];
const sections = links.flatMap((link) => {
  const section = document.getElementById(link.hash.slice(1));
  return section ? [section] : [];
});
const firstSection = sections[0];

if (header && firstSection && 'IntersectionObserver' in window) {
  const observedHeader = header;
  const observedFirstSection = firstSection;
  let observer: IntersectionObserver;
  let frame: number | undefined;

  function readingPosition() {
    const top =
      getComputedStyle(observedHeader).position === 'sticky'
        ? observedHeader.getBoundingClientRect().bottom
        : 0;
    const margin =
      Number.parseFloat(getComputedStyle(observedFirstSection).scrollMarginBlockStart) || 0;
    return {
      top,
      line: Math.min(Math.max(top, margin) + 1, window.innerHeight - 1),
      viewportHeight: window.innerHeight,
      atPageEnd: window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2,
    };
  }

  function update() {
    frame = undefined;
    const current = activeSection(
      sections.map((section) => {
        const { top, bottom } = section.getBoundingClientRect();
        return { id: section.id, top, bottom };
      }),
      readingPosition(),
    );
    for (const link of links) {
      if (link.hash === `#${current}`) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    }
  }

  function scheduleUpdate() {
    if (frame === undefined) {
      frame = requestAnimationFrame(update);
    }
  }

  function observeReadingLine() {
    observer?.disconnect();
    const { line, viewportHeight } = readingPosition();
    // A one-pixel reading band also works for sections taller than the viewport.
    observer = new IntersectionObserver(scheduleUpdate, {
      rootMargin: `-${line}px 0px -${Math.max(0, viewportHeight - line - 1)}px 0px`,
    });
    sections.forEach((section) => observer.observe(section));
    scheduleUpdate();
  }

  observeReadingLine();

  // Contact may never reach the reading line. Observe the document end separately.
  const pageEnd = document.querySelector('[data-page-end]');
  if (pageEnd) {
    new IntersectionObserver(scheduleUpdate).observe(pageEnd);
  }

  if ('ResizeObserver' in window) {
    new ResizeObserver(observeReadingLine).observe(header);
    const main = document.querySelector('main');
    if (main) {
      new ResizeObserver(scheduleUpdate).observe(main);
    }
  }

  window.addEventListener('resize', observeReadingLine);
  window.addEventListener('hashchange', scheduleUpdate);
  window.addEventListener('popstate', scheduleUpdate);
  window.addEventListener('pageshow', observeReadingLine);
  window.addEventListener('load', observeReadingLine, { once: true });
  void document.fonts.ready.then(observeReadingLine);
}

/** Calls `onEnter` once, the first time `el` scrolls into view. Returns a cleanup function. */
export function onFirstView(el: Element, onEnter: () => void, rootMargin = "0px 0px -10% 0px"): () => void {
  if (typeof IntersectionObserver === "undefined") {
    onEnter();
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        onEnter();
      }
    },
    { rootMargin },
  );
  io.observe(el);
  return () => io.disconnect();
}

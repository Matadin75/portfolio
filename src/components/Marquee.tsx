/** An endless scrolling strip. The list is rendered twice so the loop has no seam; the copy is hidden from screen readers. */
export function Marquee({ items, label }: { items: string[]; label: string }) {
  return (
    <div className="marquee">
      <ul className="marquee-track" aria-label={label}>
        {[...items, ...items].map((item, i) => (
          <li key={i} aria-hidden={i >= items.length ? true : undefined}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// The hero's scene: a planet rising over a grid horizon, with the shape of my work drawn above it:
// clients talk to one API, the API to data and services, and the whole thing ships to production.
// Decorative, so hidden from screen readers; the text beside it says the same thing.

const clients = ["Web", "iOS", "Android"];
const services = [
  { label: "MySQL", tone: "teal" },
  { label: "Payments", tone: "violet" },
  { label: "Push", tone: "teal" },
];
const rowY = (i: number) => 92 + i * 60;
const chip = { w: 120, h: 40 };
const left = 12;
const right = 600 - 12 - chip.w;
const api = { x: 225, y: 150, w: 150, h: 54 };
const apiMid = api.y + api.h / 2;

// Converging floor lines, and cross lines that bunch up toward the horizon.
const horizon = 400;
const floorV = Array.from({ length: 19 }, (_, i) => -600 + i * 100);
const floorH = Array.from({ length: 7 }, (_, i) => horizon + 160 * ((i + 1) / 7) ** 2);
const stars = [
  [40, 30], [118, 62], [210, 24], [352, 48], [430, 18], [520, 58], [574, 26], [160, 300], [470, 310], [30, 260], [584, 250],
];

function Chip({ x, y, w, label }: { x: number; y: number; w: number; label: string }) {
  return (
    <g>
      <rect className="hv-chip" x={x} y={y} width={w} height={chip.h} rx={12} />
      <text className="hv-label" x={x + w / 2} y={y + chip.h / 2}>
        {label}
      </text>
    </g>
  );
}

export function HeroVisual() {
  return (
    <svg className="hero-visual" viewBox="0 0 600 560" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="hv-planet" cx="50%" cy="0%" r="75%">
          <stop offset="0" style={{ stopColor: "var(--accent)", stopOpacity: 0.55 }} />
          <stop offset="0.35" style={{ stopColor: "var(--surface)" }} />
          <stop offset="1" style={{ stopColor: "var(--bg)" }} />
        </radialGradient>
        <linearGradient id="hv-rim" x1="0" x2="1">
          <stop offset="0" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
          <stop offset="0.3" style={{ stopColor: "var(--accent)" }} />
          <stop offset="0.7" style={{ stopColor: "var(--violet)" }} />
          <stop offset="1" style={{ stopColor: "var(--violet)", stopOpacity: 0 }} />
        </linearGradient>
        <radialGradient id="hv-glow-teal">
          <stop offset="0" style={{ stopColor: "var(--accent)", stopOpacity: 0.32 }} />
          <stop offset="1" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id="hv-glow-violet">
          <stop offset="0" style={{ stopColor: "var(--violet)", stopOpacity: 0.26 }} />
          <stop offset="1" style={{ stopColor: "var(--violet)", stopOpacity: 0 }} />
        </radialGradient>
        {/* Fades the floor out to the sides and the front, so it has no hard edges. */}
        <radialGradient
          id="hv-floor-fade"
          gradientUnits="userSpaceOnUse"
          cx="300"
          cy={horizon}
          r="300"
          gradientTransform={`translate(300 ${horizon}) scale(1 0.55) translate(-300 ${-horizon})`}
        >
          <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="hv-floor-mask">
          <rect x="0" y={horizon} width="600" height={560 - horizon} fill="url(#hv-floor-fade)" />
        </mask>
        <clipPath id="hv-sky">
          <rect x="0" y="0" width="600" height={horizon} />
        </clipPath>
      </defs>

      {/* Atmosphere */}
      <ellipse className="hv-breathe" cx="300" cy="330" rx="300" ry="170" fill="url(#hv-glow-teal)" />
      <ellipse cx="430" cy="250" rx="165" ry="140" fill="url(#hv-glow-violet)" />
      {stars.map(([x, y]) => (
        <circle key={`${x}-${y}`} className="hv-star" cx={x} cy={y} r="1.2" />
      ))}

      {/* Planet on the horizon */}
      <g clipPath="url(#hv-sky)">
        <circle cx="300" cy="470" r="220" fill="url(#hv-planet)" />
        <circle cx="300" cy="470" r="220" fill="none" stroke="url(#hv-rim)" strokeWidth="1.5" />
      </g>
      <line x1="0" y1={horizon} x2="600" y2={horizon} stroke="url(#hv-rim)" strokeWidth="1" />

      {/* Grid floor */}
      <g className="hv-floor" mask="url(#hv-floor-mask)">
        {floorV.map((x) => (
          <line key={x} x1="300" y1={horizon} x2={x + 300} y2="560" />
        ))}
        {floorH.map((y) => (
          <line key={y} x1="0" y1={y} x2="600" y2={y} />
        ))}
      </g>

      {/* The system */}
      <g className="hv-float">
        {clients.map((c, i) => {
          const y = rowY(i) + chip.h / 2;
          const d = `M${left + chip.w} ${y} C178 ${y} 178 ${apiMid} ${api.x} ${apiMid}`;
          return (
            <g key={c}>
              <path className="hv-edge" d={d} />
              <path className="hv-flow" d={d} style={{ animationDelay: `${i * -0.8}s` }} />
            </g>
          );
        })}
        {services.map((s, i) => {
          const y = rowY(i) + chip.h / 2;
          const d = `M${api.x + api.w} ${apiMid} C422 ${apiMid} 422 ${y} ${right} ${y}`;
          return (
            <g key={s.label}>
              <path className="hv-edge" d={d} />
              <path className={`hv-flow${s.tone === "violet" ? " is-violet" : ""}`} d={d} style={{ animationDelay: `${i * -0.6}s` }} />
            </g>
          );
        })}
        <path className="hv-edge" d={`M300 ${api.y + api.h} V272`} />
        <path className="hv-flow" d={`M300 ${api.y + api.h} V272`} />

        {clients.map((c, i) => (
          <Chip key={c} x={left} y={rowY(i)} w={chip.w} label={c} />
        ))}
        {services.map((s, i) => (
          <Chip key={s.label} x={right} y={rowY(i)} w={chip.w} label={s.label} />
        ))}

        <circle className="hv-halo" cx="300" cy={apiMid} r="70" />
        <rect className="hv-api" x={api.x} y={api.y} width={api.w} height={api.h} rx={16} />
        <text className="hv-label hv-api-label" x="300" y={apiMid}>
          API
        </text>

        <rect className="hv-chip hv-ship" x="222" y="272" width="156" height={chip.h} rx={chip.h / 2} />
        <circle className="hv-live" cx="246" cy={272 + chip.h / 2} r="4.5" />
        <text className="hv-label" x="310" y={272 + chip.h / 2}>
          Production
        </text>
      </g>
    </svg>
  );
}

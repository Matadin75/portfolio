// Original illustrations of each product, drawn in SVG from what it does. They are not screenshots,
// and every use is labelled "Illustration" so nobody mistakes them for one.
import type { ReactNode } from "react";

type Box = { x: number; y: number; w: number; h: number };

function Window({ x, y, w, h }: Box) {
  return (
    <g>
      <rect className="pv-frame" x={x} y={y} width={w} height={h} rx={14} />
      {[0, 1, 2].map((i) => (
        <circle key={i} className="pv-muted" cx={x + 18 + i * 12} cy={y + 15} r={3.5} />
      ))}
      <line className="pv-rule" x1={x} y1={y + 30} x2={x + w} y2={y + 30} />
    </g>
  );
}

function Phone({ x, y, w, h }: Box) {
  return (
    <g>
      <rect className="pv-frame pv-device" x={x} y={y} width={w} height={h} rx={26} />
      <rect className="pv-muted" x={x + w / 2 - 22} y={y + 10} width={44} height={6} rx={3} />
    </g>
  );
}

function Bar({ x, y, w, strong }: { x: number; y: number; w: number; strong?: boolean }) {
  return <rect className={strong ? "pv-bar-strong" : "pv-bar"} x={x} y={y} width={w} height={7} rx={3.5} />;
}

// The lighting behind each scene lives on .project-visual in CSS, so the drawing can scale to fit any
// card shape without a seam.
function Scene({ children }: { children: ReactNode }) {
  return (
    <svg className="pv" viewBox="0 0 640 400" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

/* ICE Games: an arcade of game tiles, with the companion app and its subscribe button. */
function IceGames() {
  const glyphs = [
    <circle key="c" cx="0" cy="0" r="18" />,
    <path key="t" d="M0 -20 L19 14 L-19 14 Z" />,
    <rect key="d" x="-14" y="-14" width="28" height="28" rx="4" transform="rotate(45)" />,
    <path key="r" d="M0 -20 A20 20 0 1 1 -0.1 -20 Z M0 -9 A9 9 0 1 0 0.1 -9 Z" fillRule="evenodd" />,
    <path key="p" d="M-6 -20 H6 V-6 H20 V6 H6 V20 H-6 V6 H-20 V-6 H-6 Z" />,
    <path key="s" d="M0 -21 L6 -7 L21 -6 L9 4 L13 19 L0 11 L-13 19 L-9 4 L-21 -6 L-6 -7 Z" />,
  ];
  return (
    <Scene>
      <Window x={36} y={44} w={390} h={312} />
      <Bar x={58} y={92} w={120} strong />
      <Bar x={58} y={108} w={70} />
      {glyphs.map((g, i) => {
        const x = 58 + (i % 3) * 118;
        const y = 132 + Math.floor(i / 3) * 106;
        return (
          <g key={i}>
            <rect className="pv-panel" x={x} y={y} width={106} height={90} rx={12} />
            <g transform={`translate(${x + 53} ${y + 38})`} className={i % 2 ? "pv-violet" : "pv-accent"}>
              {g}
            </g>
            <Bar x={x + 16} y={y + 70} w={52} />
          </g>
        );
      })}
      <Phone x={448} y={64} w={156} h={300} />
      <rect className="pv-panel" x={464} y={96} width={124} height={124} rx={16} />
      <circle className="pv-accent-soft" cx={526} cy={158} r={34} />
      <path className="pv-accent" d="M516 140 L544 158 L516 176 Z" />
      <Bar x={464} y={236} w={96} strong />
      <Bar x={464} y={252} w={70} />
      <rect className="pv-accent" x={464} y={312} width={124} height={34} rx={17} />
      <text className="pv-on-accent" x={526} y={329}>
        Subscribe
      </text>
    </Scene>
  );
}

/* SecondSpace: a residence floor plan in the management portal, and live chat on a student's phone. */
function SecondSpace() {
  const occupied = new Set([0, 1, 3, 6, 7, 8, 10, 13, 14]);
  return (
    <Scene>
      <Window x={28} y={40} w={414} h={320} />
      <rect className="pv-panel" x={40} y={82} width={88} height={266} rx={10} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Bar key={i} x={54} y={102 + i * 26} w={i === 1 ? 60 : 48} strong={i === 1} />
      ))}
      <Bar x={146} y={94} w={110} strong />
      <Bar x={146} y={110} w={64} />
      {Array.from({ length: 15 }, (_, i) => {
        const x = 146 + (i % 5) * 58;
        const y = 134 + Math.floor(i / 5) * 54;
        const cls = i === 11 ? "pv-violet-soft pv-room" : occupied.has(i) ? "pv-accent-soft pv-room" : "pv-panel";
        return <rect key={i} className={cls} x={x} y={y} width={50} height={46} rx={8} />;
      })}
      <rect className="pv-accent" x={146} y={306} width={96} height={30} rx={15} />
      <text className="pv-on-accent" x={194} y={321}>
        Approve
      </text>
      <Phone x={462} y={52} w={150} h={300} />
      {[
        { x: 476, y: 86, w: 96, me: false },
        { x: 506, y: 128, w: 92, me: true },
        { x: 476, y: 170, w: 110, me: false },
        { x: 520, y: 212, w: 78, me: true },
      ].map((b, i) => (
        <rect key={i} className={b.me ? "pv-accent" : "pv-panel"} x={b.x} y={b.y} width={b.w} height={30} rx={12} />
      ))}
      <rect className="pv-panel" x={476} y={258} width={52} height={26} rx={13} />
      {[0, 1, 2].map((i) => (
        <circle key={i} className="pv-typing" cx={490 + i * 12} cy={271} r={3} style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
      <rect className="pv-panel" x={476} y={308} width={122} height={30} rx={15} />
    </Scene>
  );
}

/* YouToo: recurring events on a list, and a QR code for check-in. */
function YouToo() {
  const n = 13;
  const finder = (r: number, c: number) =>
    [
      [0, 0],
      [0, n - 5],
      [n - 5, 0],
    ].some(([fr, fc]) => r >= fr && r < fr + 5 && c >= fc && c < fc + 5);
  const cells: [number, number][] = [];
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++) if (!finder(r, c) && (r * 7 + c * 13 + r * c) % 5 < 2) cells.push([r, c]);
  const qx = 432;
  const qy = 110;
  const s = 10;
  return (
    <Scene>
      {[0, 1, 2].map((i) => {
        const y = 56 + i * 98;
        return (
          <g key={i} className={i === 1 ? "pv-lift" : undefined}>
            <rect className="pv-panel" x={36} y={y} width={316} height={82} rx={14} />
            <rect className={i === 1 ? "pv-violet" : "pv-accent"} x={52} y={y + 16} width={50} height={50} rx={10} />
            <rect className="pv-ink-bar" x={62} y={y + 28} width={30} height={6} rx={3} />
            <rect className="pv-ink-bar" x={66} y={y + 42} width={22} height={10} rx={3} />
            <Bar x={118} y={y + 22} w={i === 1 ? 150 : 120} strong />
            <Bar x={118} y={y + 40} w={90} />
            <path className="pv-stroke-accent" d={`M${312} ${y + 34} a10 10 0 1 1 -4 -8 m4 -6 v6 h-6`} />
          </g>
        );
      })}
      <Phone x={396} y={40} w={204} h={320} />
      <rect className="pv-qr-bg" x={qx - 12} y={qy - 12} width={n * s + 24} height={n * s + 24} rx={12} />
      {[
        [0, 0],
        [0, n - 5],
        [n - 5, 0],
      ].map(([r, c]) => (
        <g key={`${r}-${c}`}>
          <rect className="pv-qr" x={qx + c * s} y={qy + r * s} width={5 * s} height={5 * s} rx={6} />
          <rect className="pv-qr-bg" x={qx + c * s + s} y={qy + r * s + s} width={3 * s} height={3 * s} rx={3} />
          <rect className="pv-qr" x={qx + c * s + 1.6 * s} y={qy + r * s + 1.6 * s} width={1.8 * s} height={1.8 * s} rx={2} />
        </g>
      ))}
      {cells.map(([r, c]) => (
        <rect key={`${r}-${c}`} className="pv-qr" x={qx + c * s + 1} y={qy + r * s + 1} width={s - 2} height={s - 2} rx={2} />
      ))}
      <rect className="pv-accent" x={420} y={286} width={156} height={34} rx={17} />
      <path className="pv-ink-stroke" d="M444 303 l6 6 l11 -12" />
      <text className="pv-on-accent" x={516} y={303}>
        Checked in
      </text>
    </Scene>
  );
}

/* Uptooyoo: provider listings, a booking calendar, and the website onboarding generates. */
function Uptooyoo() {
  return (
    <Scene>
      {[0, 1, 2, 3].map((i) => {
        const x = 36 + (i % 2) * 168;
        const y = 48 + Math.floor(i / 2) * 156;
        return (
          <g key={i}>
            <rect className="pv-panel" x={x} y={y} width={156} height={140} rx={14} />
            <circle className={i === 2 ? "pv-violet" : "pv-accent-soft"} cx={x + 32} cy={y + 34} r={16} />
            <Bar x={x + 58} y={y + 24} w={74} strong />
            <Bar x={x + 58} y={y + 38} w={50} />
            <Bar x={x + 16} y={y + 70} w={120} />
            <Bar x={x + 16} y={y + 84} w={96} />
            {[0, 1, 2, 3, 4].map((k) => (
              <circle key={k} className={k < 4 ? "pv-accent" : "pv-muted"} cx={x + 22 + k * 14} cy={y + 116} r={4} />
            ))}
          </g>
        );
      })}
      <rect className="pv-frame" x={384} y={40} width={220} height={178} rx={14} />
      <Bar x={400} y={56} w={90} strong />
      {Array.from({ length: 28 }, (_, i) => {
        const x = 400 + (i % 7) * 28;
        const y = 78 + Math.floor(i / 7) * 32;
        const cls = i === 16 ? "pv-accent" : i === 9 || i === 23 ? "pv-violet-soft" : "pv-muted";
        return <rect key={i} className={cls} x={x} y={y} width={22} height={24} rx={6} />;
      })}
      <Window x={384} y={234} w={220} h={130} />
      <rect className="pv-hero-band" x={396} y={274} width={196} height={42} rx={8} />
      <Bar x={408} y={290} w={90} strong />
      <Bar x={396} y={328} w={140} />
      <rect className="pv-accent" x={548} y={322} width={44} height={20} rx={10} />
    </Scene>
  );
}

/* ForFishSake: a contour map with catch pins and a trip, and a catch in the social feed. */
function ForFishSake() {
  const pins = [
    [128, 150],
    [250, 112],
    [212, 262],
    [348, 210],
  ];
  return (
    <Scene>
      <rect className="pv-frame" x={28} y={32} width={396} height={336} rx={16} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          className="pv-contour"
          d={`M28 ${88 + i * 46} C 120 ${58 + i * 46}, 200 ${128 + i * 46}, 300 ${84 + i * 46} S 400 ${70 + i * 46}, 424 ${100 + i * 46}`}
        />
      ))}
      <path className="pv-trip" d="M128 150 C 170 130, 210 100, 250 112 S 330 180, 348 210 S 260 270, 212 262" />
      {pins.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path className={i === 3 ? "pv-violet" : "pv-accent"} d="M0 0 C -12 -14, -12 -30, 0 -30 C 12 -30, 12 -14, 0 0 Z" />
          <circle className="pv-pin-dot" cx={0} cy={-19} r={4} />
        </g>
      ))}
      <Phone x={448} y={44} w={168} h={316} />
      <rect className="pv-panel" x={462} y={76} width={140} height={110} rx={12} />
      <g className="pv-accent" transform="translate(532 131)">
        <ellipse cx="-6" cy="0" rx="34" ry="15" />
        <path d="M24 0 L44 -14 L40 0 L44 14 Z" />
      </g>
      <circle className="pv-pin-dot" cx={510} cy={127} r={3} />
      <Bar x={462} y={200} w={100} strong />
      <Bar x={462} y={216} w={72} />
      <path className="pv-violet" d="M470 248 c-6 -6 -14 0 -8 7 l8 8 l8 -8 c6 -7 -2 -13 -8 -7 z" />
      <Bar x={490} y={248} w={40} />
      <rect className="pv-panel" x={462} y={278} width={140} height={60} rx={12} />
      <Bar x={476} y={296} w={90} />
      <Bar x={476} y={312} w={60} />
    </Scene>
  );
}

const visuals: Record<string, () => ReactNode> = {
  "ice-games": IceGames,
  secondspace: SecondSpace,
  youtoo: YouToo,
  uptooyoo: Uptooyoo,
  forfishsake: ForFishSake,
};

/** The illustration for a project, labelled as one. */
export function ProjectVisual({ slug }: { slug: string }) {
  const Visual = visuals[slug];
  if (!Visual) return null;
  return (
    <div className="project-visual">
      <Visual />
      <span className="visual-label">Illustration</span>
    </div>
  );
}

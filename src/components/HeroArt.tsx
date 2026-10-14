import ActionBurst from './ActionBurst';

/** Original hero-page artwork: a domino mask over a sunburst with sound effects. */
export default function HeroArt() {
  return (
    <div className="sunburst relative h-full min-h-[300px] overflow-hidden" aria-hidden="true">
      {/* speed lines */}
      <svg viewBox="0 0 400 360" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <g stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" opacity="0.85">
          <path d="M20 300 L90 262" />
          <path d="M30 330 L120 285" />
          <path d="M330 70 L385 40" />
          <path d="M345 100 L392 78" />
        </g>
        {/* hero badge */}
        <circle cx="206" cy="196" r="118" fill="var(--ink)" />
        <circle cx="198" cy="188" r="118" fill="var(--color-hero-blue)" stroke="var(--ink)" strokeWidth="8" />
        <circle cx="198" cy="188" r="96" fill="none" stroke="var(--color-hero-yellow)" strokeWidth="6" strokeDasharray="14 10" />
        {/* domino mask */}
        <path
          d="M78 180 C 92 132, 150 124, 198 150 C 246 124, 304 132, 318 180 C 328 222, 284 250, 248 236 C 226 228, 212 212, 198 212 C 184 212, 170 228, 148 236 C 112 250, 68 222, 78 180 Z"
          fill="var(--color-hero-red)"
          stroke="var(--ink)"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <ellipse cx="146" cy="186" rx="30" ry="19" transform="rotate(-10 146 186)" fill="#fff" stroke="var(--ink)" strokeWidth="6" />
        <ellipse cx="250" cy="186" rx="30" ry="19" transform="rotate(10 250 186)" fill="#fff" stroke="var(--ink)" strokeWidth="6" />
        {/* cheeky grin */}
        <path d="M150 262 Q 198 300 246 262" fill="none" stroke="var(--ink)" strokeWidth="9" strokeLinecap="round" />
        <path d="M168 270 Q 198 286 228 270" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <ActionBurst word="POW!" size={128} className="animate-float absolute left-2 top-3 [--r:-10deg]" />
      <ActionBurst
        word="HA!"
        size={104}
        fill="var(--color-hero-red)"
        textColor="var(--color-hero-yellow)"
        className="animate-float absolute bottom-3 right-3 [--r:8deg] [animation-delay:-1.6s]"
      />
      <ActionBurst
        word="ZAP!"
        size={84}
        fill="#fff"
        textColor="var(--color-hero-blue)"
        className="animate-wiggle absolute right-5 top-4 [--r:12deg]"
      />
    </div>
  );
}

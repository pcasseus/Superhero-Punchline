interface ActionBurstProps {
  word: string;
  /** Rendered width in px (height matches). */
  size?: number;
  fill?: string;
  textColor?: string;
  className?: string;
  /** Number of spikes on the starburst. */
  spikes?: number;
}

/** Builds a slightly irregular starburst polygon so each burst feels hand-drawn. */
function burstPoints(spikes: number, seed: number): string {
  const pts: string[] = [];
  const total = spikes * 2;
  for (let i = 0; i < total; i += 1) {
    const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
    const wobble = ((Math.sin(seed * 12.9898 + i * 78.233) * 43758.5453) % 1 + 1) % 1; // 0..1, deterministic
    const r = i % 2 === 0 ? 92 - wobble * 10 : 62 + wobble * 8;
    pts.push(`${(100 + r * Math.cos(angle)).toFixed(1)},${(100 + r * Math.sin(angle)).toFixed(1)}`);
  }
  return pts.join(' ');
}

/** Decorative comic sound-effect ("POW!", "BAM!") inside a starburst. */
export default function ActionBurst({
  word,
  size = 140,
  fill = 'var(--color-hero-yellow)',
  textColor = 'var(--color-hero-red)',
  className = '',
  spikes = 13,
}: ActionBurstProps) {
  const seed = word.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const fontSize = word.length <= 3 ? 64 : word.length <= 5 ? 50 : 36;
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`select-none pointer-events-none ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <polygon points={burstPoints(spikes, seed)} fill="var(--ink)" transform="translate(7 7)" />
      <polygon points={burstPoints(spikes, seed)} fill={fill} stroke="var(--ink)" strokeWidth="6" strokeLinejoin="round" />
      <text
        x="100"
        y="100"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Bangers, Impact, sans-serif"
        fontSize={fontSize}
        letterSpacing="2"
        fill={textColor}
        stroke="var(--ink)"
        strokeWidth="5"
        paintOrder="stroke"
        transform="rotate(-8 100 100)"
      >
        {word}
      </text>
    </svg>
  );
}

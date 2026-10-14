/** Original Superhero Punchlines emblem: a lightning-bolt speech bubble on a starburst badge. */
export default function Logo({ size = 52, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true" focusable="false">
      <circle cx="33.5" cy="33.5" r="28" fill="#141414" />
      <circle cx="31" cy="31" r="28" fill="#ffd400" stroke="#141414" strokeWidth="3.5" />
      <path
        d="M14 20c0-4 3-6.5 7-6.5h20c4 0 7 2.5 7 6.5v14c0 4-3 6.5-7 6.5H31l-9 8 1.5-8H21c-4 0-7-2.5-7-6.5z"
        fill="#ffffff"
        stroke="#141414"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path d="M34 16.5 24.5 29h6.5l-2.5 9.5L39 25h-6.5z" fill="#d7141a" stroke="#141414" strokeWidth="2.4" strokeLinejoin="round" />
    </svg>
  );
}

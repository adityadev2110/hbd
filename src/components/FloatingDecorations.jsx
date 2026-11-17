import { motion } from 'framer-motion'

const R = (i, m) => (((i * 9301 + 49297) % 233280) / 233280) * m

export function V5BackdropDecorations() {
  return (
    <>
      <svg
        className="v5-bunting-corner"
        viewBox="0 0 360 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M-10 185 Q 170 155 315 -10"
          stroke="#e8959b"
          strokeWidth="2.5"
          fill="none"
        />
        <path d="M25 181 L98 164 L68 232 Z" fill="#ffd9e6" stroke="#f3a6bf" strokeWidth="1.5" />
        <path d="M35 183 L88 170 L66 220 Z" fill="#ffffff" opacity="0.35" />
        <path d="M98 164 L168 130 L158 202 Z" fill="#ff9ebb" stroke="#e86f96" strokeWidth="1.5" />
        <path d="M108 164 L158 140 L152 190 Z" fill="#ffffff" opacity="0.25" />
        <path d="M168 130 L232 82 L238 158 Z" fill="#ffc8ba" stroke="#ef9d8c" strokeWidth="1.5" />
        <path d="M178 128 L224 94 L228 146 Z" fill="#ffffff" opacity="0.3" />
        <path d="M232 82 L292 18 L315 96 Z" fill="#ffd5b8" stroke="#f0b088" strokeWidth="1.5" />
        <path d="M242 78 L285 32 L302 88 Z" fill="#ffffff" opacity="0.35" />
      </svg>

      <svg
        className="v5-clouds-bottom"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="cloudGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffcce0" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#ffe8f1" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="cloudGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#fff0f6" stopOpacity="0.98" />
          </linearGradient>
        </defs>
        <path
          d="M0 180 L0 95 Q60 40 135 85 Q210 30 295 90 Q380 45 460 105 Q550 55 640 110 Q740 65 830 115 Q920 50 1020 105 Q1120 40 1220 95 Q1330 35 1440 85 L1440 180 Z"
          fill="url(#cloudGrad1)"
        />
        <path
          d="M0 180 L0 125 Q85 75 170 125 Q260 70 355 125 Q450 85 545 135 Q650 90 755 140 Q860 85 965 135 Q1075 75 1180 125 Q1300 65 1440 120 L1440 180 Z"
          fill="url(#cloudGrad2)"
        />
      </svg>
    </>
  )
}

export function Floaters({ items = ['♡', '✦', '♥', '✧', '🌸'], count = 15 }) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-2" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <motion.span
          key={i}
          className="absolute select-none"
          style={{
            left: `${R(i, 96)}%`,
            bottom: -35,
            fontSize: 13 + R(i + 3, 16),
            color: ['#ff85ad', '#f4a2b8', '#f6bd80', '#d896ff'][i % 4],
            textShadow: '0 2px 8px rgba(255,255,255,0.9)',
          }}
          animate={{
            y: [0, -920],
            x: [0, R(i + 9, 36) - 18, 0],
            opacity: [0, 0.75, 0.65, 0],
            rotate: [0, R(i + 5, 40) - 20],
          }}
          transition={{
            duration: 10 + R(i, 9),
            repeat: Infinity,
            delay: R(i + 1, 8),
            ease: 'linear',
          }}
        >
          {items[i % items.length]}
        </motion.span>
      ))}
    </div>
  )
}

export function Confetti({ burst = 0, count = 75 }) {
  const cols = ['#ff4d88', '#ff9ebb', '#ffd166', '#c77dff', '#72efdd', '#ff8fab']
  return (
    <div key={burst} className="pointer-events-none fixed inset-0 overflow-hidden z-50" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <motion.i
          key={i}
          className="absolute block"
          style={{
            left: `${R(i, 100)}%`,
            top: -20,
            width: 6 + R(i + 4, 5),
            height: 8 + R(i + 8, 7),
            background: cols[i % cols.length],
            borderRadius: i % 3 === 0 ? '50%' : '2px',
          }}
          animate={{
            y: '108vh',
            x: R(i + 7, 200) - 100,
            rotate: R(i, 1080),
            opacity: [1, 1, 0.75],
          }}
          transition={{
            duration: 2.8 + R(i + 2, 2.5),
            delay: R(i + 5, 0.6),
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  )
}

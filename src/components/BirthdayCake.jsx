import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Confetti, Floaters, V5BackdropDecorations } from './FloatingDecorations'
import { content } from '../data/birthdayContent'

const INITIAL_SHUFFLE = [2, 5, 8, 0, 4, 1, 6, 7, 3]

export function FixPicturePuzzleStage({ onNext }) {
  const [countdown, setCountdown] = useState(2)
  const [tiles, setTiles] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8])
  const [selected, setSelected] = useState(null)
  const [swaps, setSwaps] = useState(0)
  const [solved, setSolved] = useState(false)

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
      return () => clearTimeout(t)
    } else if (countdown === 0) {
      setTiles(INITIAL_SHUFFLE)
      setCountdown(-1)
    }
  }, [countdown])

  const handleTileClick = (idx) => {
    if (countdown >= 0 || solved) return
    if (selected === null) {
      setSelected(idx)
      return
    }
    if (selected === idx) {
      setSelected(null)
      return
    }
    const next = [...tiles]
    const temp = next[selected]
    next[selected] = next[idx]
    next[idx] = temp
    setTiles(next)
    setSelected(null)
    setSwaps((s) => s + 1)

    if (next.every((val, i) => val === i)) {
      setSolved(true)
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="v5-stage"
    >
      <V5BackdropDecorations />
      <Floaters items={['♡', '🧩', '✨']} count={10} />
      {solved && <Confetti count={80} />}

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <h1 className="font-display text-[34px] font-bold text-[#2c3545] sm:text-[40px]">
          Fix the Picture 🧩
        </h1>

        <div className="mt-2 rounded-full border border-[#ffe0eb] bg-white px-5 py-1.5 text-[13px] font-semibold shadow-sm">
          {countdown >= 0 ? (
            <span className="text-[#334155]">
              Memorize the image! Shuffling in {countdown}s...
            </span>
          ) : (
            <span className="text-[#f41f68]">Tap two pieces to swap them!</span>
          )}
        </div>

        <div className="mt-5 rounded-[26px] border-2 border-dashed border-[#cbd5e1] bg-white/95 p-3 shadow-[0_18px_45px_rgba(232,118,158,0.16)]">
          {countdown >= 0 || solved ? (
            <motion.img
              initial={{ scale: 0.96, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              src={content.puzzleImage}
              alt="Happy Birthday Cake"
              className="h-[310px] w-[310px] rounded-[18px] object-cover sm:h-[340px] sm:w-[340px]"
            />
          ) : (
            <div className="grid h-[310px] w-[310px] grid-cols-3 gap-1.5 sm:h-[340px] sm:w-[340px]">
              {tiles.map((piece, idx) => {
                const row = Math.floor(piece / 3)
                const col = piece % 3
                const isSel = selected === idx
                return (
                  <motion.button
                    key={idx}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTileClick(idx)}
                    className={`relative overflow-hidden rounded-[12px] transition ${
                      isSel ? 'ring-4 ring-[#f41f68] scale-[0.97]' : ''
                    }`}
                    style={{
                      backgroundImage: `url(${content.puzzleImage})`,
                      backgroundSize: '300% 300%',
                      backgroundPosition: `${col * 50}% ${row * 50}%`,
                    }}
                    aria-label={`Puzzle tile ${idx + 1}`}
                  />
                )
              })}
            </div>
          )}
        </div>

        {!solved && countdown < 0 && (
          <div className="mt-4 flex items-center gap-4">
            <p className="text-[14px] font-bold text-[#475569]">Swaps: {swaps}</p>
            {swaps >= 2 && (
              <button
                type="button"
                onClick={() => {
                  setTiles([0, 1, 2, 3, 4, 5, 6, 7, 8])
                  setSolved(true)
                }}
                className="text-xs font-semibold text-[#f41f68] underline"
              >
                Auto-fix ✨
              </button>
            )}
          </div>
        )}

        {solved && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 flex flex-col items-center gap-3"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#e6fcf5] px-5 py-2 text-[14px] font-bold text-[#0ca678] shadow-sm">
              <Check size={16} strokeWidth={3} /> Picture Fixed! 🎉
            </div>
            <button type="button" onClick={onNext} className="v5-btn-pink">
              Take the Quiz <ArrowRight size={16} />
            </button>
          </motion.div>
        )}
      </div>
    </motion.main>
  )
}

export default function BirthdayCake() {
  const [lit, setLit] = useState([true, true, true, true, true])
  const out = lit.every((l) => !l)
  const blow = (i) => setLit((l) => l.map((v, j) => (j === i ? false : v)))

  return (
    <section className="relative z-10 grid min-h-dvh place-items-center px-4 py-16 text-center">
      {out && <Confetti burst={1} />}
      <div>
        <h2 className="font-script text-4xl text-[#f41f68]">
          {out ? 'Your wish is on its way! 🌟' : 'Make a Wish! ✨'}
        </h2>
        <p className="mb-6 text-sm opacity-80">
          {out ? 'Happy Birthday!' : 'Tap each candle to blow it out'}
        </p>
        <svg viewBox="0 0 300 260" className="mx-auto w-full max-w-xs" role="img" aria-label="Birthday cake">
          <ellipse cx="150" cy="240" rx="130" ry="14" fill="#c4b5fd" opacity=".5" />
          <rect x="40" y="160" width="220" height="75" rx="16" fill="#f9a8d4" />
          <rect x="70" y="105" width="160" height="62" rx="14" fill="#fde7f3" />
          <path d="M40 170q20 22 40 0t40 0 40 0 40 0 40 0v-8H40z" fill="#fff" />
          <path d="M70 112q20 18 40 0t40 0 40 0 40 0v-8H70z" fill="#f472b6" />
          {[0, 1, 2, 3, 4].map((i) => {
            const x = 95 + i * 27
            return (
              <g
                key={i}
                onClick={() => blow(i)}
                onKeyDown={(e) => e.key === 'Enter' && blow(i)}
                tabIndex={0}
                role="button"
                aria-label={`Blow candle ${i + 1}`}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x={x - 5}
                  y="68"
                  width="10"
                  height="38"
                  rx="3"
                  fill={['#a78bfa', '#fbbf24', '#34d399', '#60a5fa', '#f87171'][i]}
                />
                {lit[i] ? (
                  <motion.ellipse
                    cx={x}
                    cy="58"
                    rx="6"
                    ry="11"
                    fill="#fbbf24"
                    style={{ filter: 'drop-shadow(0 0 6px #fb923c)' }}
                    animate={{ scaleY: [1, 1.2, 0.9, 1], scaleX: [1, 0.85, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 0.5 + i * 0.07 }}
                  />
                ) : (
                  <motion.circle
                    cx={x}
                    r="3"
                    fill="#9ca3af"
                    initial={{ opacity: 0.8, cy: 60 }}
                    animate={{ opacity: 0, cy: 30 }}
                    transition={{ duration: 1.2 }}
                  />
                )}
                <rect x={x - 16} y="40" width="32" height="66" fill="transparent" />
              </g>
            )
          })}
        </svg>
      </div>
    </section>
  )
}

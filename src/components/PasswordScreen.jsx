import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Delete, Heart, Lock } from 'lucide-react'
import { PASSWORD } from '../config/password'
import { Floaters, V5BackdropDecorations } from './FloatingDecorations'

function HeartLockIllustration({ unlocked }) {
  return (
    <div className="relative mx-auto mb-5 flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-[#fff2f7] shadow-[0_10px_28px_rgba(244,63,122,0.14)]">
      <motion.svg
        viewBox="0 0 120 120"
        className="h-24 w-24 overflow-visible"
        animate={unlocked ? { scale: [1, 1.12, 1], rotate: [0, -6, 6, 0] } : { y: [0, -3, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.path
          d="M 48 52 L 48 30 C 48 16, 30 16, 30 30 L 30 42"
          fill="none"
          stroke="#590d22"
          strokeWidth="5.5"
          strokeLinecap="round"
          animate={unlocked ? { y: -6, rotate: -12 } : { y: 0, rotate: 0 }}
        />
        <path
          d="M 60 88 L 37 67 C 24 54, 34 36, 49 42 C 55 44, 58 49, 60 52 C 62 49, 65 44, 71 42 C 86 36, 96 54, 83 67 Z"
          fill="#ff5c8a"
        />
        <rect x="57.5" y="56" width="5" height="16" rx="2.5" fill="#d4d700" />
        <circle cx="60" cy="64" r="3.2" fill="#590d22" />
        <path d="M58 69 L62 69 L63 74 L57 74 Z" fill="#590d22" />
      </motion.svg>

      <div className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#ff6b9d] to-[#f42f72] text-white shadow-md">
        <Lock size={17} strokeWidth={2.4} />
      </div>
    </div>
  )
}

function CuteTeddyBadge() {
  return (
    <motion.div
      className="pointer-events-none absolute -top-11 right-5 hidden sm:block"
      animate={{ y: [0, -5, 0], rotate: [0, 3, -3, 0] }}
      transition={{ duration: 3.5, repeat: Infinity }}
      aria-hidden="true"
    >
      <svg width="64" height="60" viewBox="0 0 120 110" fill="none">
        <circle cx="34" cy="28" r="14" fill="#c6865c" />
        <circle cx="34" cy="28" r="7" fill="#f3c6a8" />
        <circle cx="86" cy="28" r="14" fill="#c6865c" />
        <circle cx="86" cy="28" r="7" fill="#f3c6a8" />
        <ellipse cx="60" cy="54" rx="34" ry="31" fill="#d99a70" />
        <ellipse cx="60" cy="63" rx="19" ry="14" fill="#f6d8c0" />
        <circle cx="47" cy="49" r="3.2" fill="#4a2e2b" />
        <circle cx="73" cy="49" r="3.2" fill="#4a2e2b" />
        <ellipse cx="60" cy="58" rx="4.5" ry="3.5" fill="#4a2e2b" />
        <ellipse cx="39" cy="58" rx="6" ry="3.5" fill="#ff8fab" opacity="0.65" />
        <ellipse cx="81" cy="58" rx="6" ry="3.5" fill="#ff8fab" opacity="0.65" />
      </svg>
    </motion.div>
  )
}

export default function PasswordScreen({ onUnlock }) {
  const [code, setCode] = useState('')
  const [ok, setOk] = useState(false)
  const [shake, setShake] = useState(0)
  const [message, setMessage] = useState('Enter the secret code to begin')
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const press = (digit) => {
    if (ok || code.length >= 6) return
    const next = code + digit
    setCode(next)
    setMessage('Enter the secret code to begin')
    if (next.length === 6) {
      clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        if (next === PASSWORD) {
          setOk(true)
          setMessage('Unlocked! Something special awaits ✨')
          timer.current = setTimeout(onUnlock, 750)
        } else {
          setShake((s) => s + 1)
          setCode('')
          setMessage('Oops! Wrong secret code, try again 💗')
          if (navigator.vibrate) navigator.vibrate(140)
        }
      }, 220)
    }
  }

  const back = () => {
    if (!ok) setCode((v) => v.slice(0, -1))
  }

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') press(e.key)
      else if (e.key === 'Backspace') back()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45 }}
      className="v5-stage"
    >
      <V5BackdropDecorations />
      <Floaters items={['♡', '♥', '✦', '🌸']} count={12} />

      <motion.div
        key={shake}
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          x: shake ? [0, -10, 10, -7, 7, 0] : 0,
        }}
        transition={{ duration: 0.45 }}
        className="v5-card v5-grid-card w-full max-w-[430px] px-7 py-9 sm:px-10"
      >
        <CuteTeddyBadge />
        <HeartLockIllustration unlocked={ok} />

        <h1 className="font-display text-[28px] font-bold tracking-tight text-[#f41f68] sm:text-[31px]">
          Unlock Your Surprise
        </h1>
        <p className="mt-1.5 text-[14px] font-medium text-[#ff6b9d]">{message}</p>

        <div
          className="my-6 flex items-center justify-center gap-3"
          aria-label={`${code.length} of 6 digits entered`}
        >
          {Array.from({ length: 6 }, (_, i) => {
            const active = i < code.length
            return (
              <motion.span
                key={i}
                animate={{ scale: active ? [1, 1.22, 1.06] : 1 }}
                transition={{ duration: 0.2 }}
                className={`v5-pin-circle ${active ? 'active' : ''}`}
              >
                <Heart
                  size={14}
                  className={active ? 'text-[#f41f68]' : 'text-[#ffc2d6]'}
                  fill={active ? '#f41f68' : 'none'}
                  strokeWidth={2}
                />
              </motion.span>
            )
          })}
        </div>

        <div className="mx-auto mt-4 grid max-w-[248px] grid-cols-3 place-items-center gap-x-6 gap-y-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <motion.button
              key={n}
              type="button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => press(String(n))}
              disabled={ok}
              className="v5-key-circle"
            >
              {n}
            </motion.button>
          ))}

          <span className="h-[66px] w-[66px]" aria-hidden="true" />

          <motion.button
            type="button"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => press('0')}
            disabled={ok}
            className="v5-key-circle"
          >
            0
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            onClick={back}
            disabled={ok}
            aria-label="Backspace"
            className="v5-key-circle"
          >
            <Delete size={20} strokeWidth={2.2} />
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {ok && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-50 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </motion.main>
  )
}

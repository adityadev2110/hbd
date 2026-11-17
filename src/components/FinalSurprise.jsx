import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, RotateCcw, Sparkles } from 'lucide-react'
import { Confetti, Floaters, V5BackdropDecorations } from './FloatingDecorations'
import { content } from '../data/birthdayContent'

export default function FinalSurprise({ onRelive, onOpenBonusStory }) {
  const [burst, setBurst] = useState(1)
  const [imgErr, setImgErr] = useState(false)

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="v5-stage"
    >
      <V5BackdropDecorations />
      <Floaters items={['♡', '♥', '💗', '✨']} count={16} />
      {burst > 0 && <Confetti burst={burst} count={90} />}

      <motion.div
        initial={{ scale: 0.92, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="v5-card relative w-full max-w-[440px] px-8 py-10"
      >
        <Heart
          size={28}
          fill="#ff4d94"
          className="absolute -right-3 -top-3 rotate-12 text-[#ff4d94] drop-shadow"
        />
        <Heart
          size={26}
          fill="#ff5c8a"
          className="absolute -bottom-3 -left-3 -rotate-12 text-[#ff5c8a] drop-shadow"
        />

        <div className="relative mx-auto mb-6 h-44 w-44 rounded-full border-4 border-white p-1 shadow-[0_0_40px_rgba(255,107,157,0.35)]">
          {!imgErr ? (
            <img
              src={content.finalCard.avatar}
              alt="Cute portrait"
              onError={() => setImgErr(true)}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <div className="grid h-full w-full place-items-center rounded-full bg-[#fff0f5] text-6xl">
              🐱
            </div>
          )}
        </div>

        <span className="inline-block rounded-full bg-[#fff0f5] px-4 py-1.5 text-[11px] font-bold tracking-widest text-[#f41f68] shadow-xs">
          {content.finalCard.badge}
        </span>

        <h1 className="font-script mt-4 text-[44px] font-bold leading-tight text-[#f41f68] sm:text-[50px]">
          {content.finalCard.title}
        </h1>

        <p className="mx-auto mt-3 max-w-[300px] text-[15px] font-semibold leading-relaxed text-[#334155]">
          {content.finalCard.text}
        </p>

        <div className="mt-7 flex flex-col items-center gap-3">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setBurst((b) => b + 1)
              if (onRelive) onRelive()
            }}
            className="v5-btn-pink"
          >
            <RotateCcw size={16} /> Relive it
          </motion.button>

          {onOpenBonusStory && (
            <button
              type="button"
              onClick={onOpenBonusStory}
              className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-[#f41f68] opacity-85 hover:opacity-100"
            >
              <Sparkles size={13} /> Blow Birthday Cake Candles & View Timeline
            </button>
          )}
        </div>
      </motion.div>
    </motion.section>
  )
}

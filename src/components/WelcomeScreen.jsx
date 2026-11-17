import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Gift } from 'lucide-react'
import { Confetti, Floaters, V5BackdropDecorations } from './FloatingDecorations'
import { content } from '../data/birthdayContent'

function CuteCakeMascot() {
  const [imgErr, setImgErr] = useState(false)
  return (
    <div className="relative mx-auto mb-5 flex h-44 w-44 items-center justify-center rounded-full border-4 border-white bg-[#fff7fa] shadow-[0_14px_35px_rgba(244,63,122,0.18)] overflow-hidden">
      {!imgErr ? (
        <img
          src="/images/cute-cake-mascot.png"
          alt="Cute birthday mascot in cake"
          className="h-full w-full object-cover"
          onError={() => setImgErr(true)}
        />
      ) : (
        <span className="text-7xl">🎂</span>
      )}
    </div>
  )
}

export default function WelcomeScreen({ onOpen }) {
  const [openedGift, setOpenedGift] = useState(false)

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="v5-stage"
    >
      <V5BackdropDecorations />
      <Floaters items={['♡', '✦', '♥', '🌸']} count={14} />
      {openedGift && <Confetti count={65} />}

      <AnimatePresence mode="wait">
        {!openedGift ? (
          <motion.div
            key="gift-teaser"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="v5-card w-full max-w-[440px] px-8 py-11"
          >
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [0, -4, 4, 0] }}
              transition={{ duration: 2.6, repeat: Infinity }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#ffe4ee] bg-white shadow-[0_10px_25px_rgba(244,63,122,0.15)] text-[#ff477e]"
            >
              <Gift size={34} strokeWidth={2.2} />
            </motion.div>

            <h1 className="font-display text-[28px] font-bold leading-snug text-[#1f2937] sm:text-[32px]">
              Something special
              <br />
              is waiting...
            </h1>
            <p className="mt-2.5 text-[14px] font-semibold text-[#64748b]">
              Tap the button to open it ✨
            </p>

            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenedGift(true)}
              className="v5-btn-pink mt-7"
            >
              Open It!
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="birthday-hero"
            initial={{ scale: 0.9, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="v5-card w-full max-w-[430px] px-8 py-10"
          >
            <CuteCakeMascot />

            <h1
              className="font-script text-[54px] font-bold leading-[1.08] text-[#f41f68] sm:text-[62px]"
              style={{ textShadow: '0 4px 16px rgba(244,31,104,0.16)' }}
            >
              Happy
              <br />
              Birthday,
            </h1>

            <p className="font-script mt-1 text-[34px] font-bold text-[#2c3545]">
              {content.name} <span className="text-[#f41f68]">❤️</span>
            </p>

            <p className="mx-auto mt-4 max-w-[290px] text-[14px] font-semibold leading-relaxed text-[#475569]">
              {content.welcomeSubtitle}
            </p>

            <motion.button
              type="button"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpen}
              className="v5-btn-white mt-8"
            >
              Let&apos;s explore <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  )
}

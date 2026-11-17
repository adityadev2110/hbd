import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Heart, Mail } from 'lucide-react'
import { content } from '../data/birthdayContent'
import { Floaters, V5BackdropDecorations } from './FloatingDecorations'

export function LetterStage({ onNext }) {
  const [opened, setOpened] = useState(false)
  const [page, setPage] = useState(0)
  const pages = content.letterPages

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="v5-stage"
    >
      <V5BackdropDecorations />
      <Floaters items={['♡', '💌', '♥', '✨']} count={12} />

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="mail-prompt"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0 }}
            className="v5-card w-full max-w-[440px] px-8 py-11"
          >
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#fff0f5] text-[#ff477e]">
              <Mail size={34} strokeWidth={2} />
            </div>

            <h1 className="font-display text-[28px] font-bold text-[#2c3545]">
              You&apos;ve Got Mail! 🎀
            </h1>
            <p className="mt-2 text-[14px] font-medium text-[#64748b]">
              Tap to open your special letter
            </p>

            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setOpened(true)}
              aria-label="Open special letter"
              className="mx-auto mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#ff5c8a] to-[#f41f68] text-white shadow-[0_10px_25px_rgba(244,31,104,0.38)]"
            >
              <Heart size={22} fill="currentColor" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key={`letter-page-${page}`}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.32 }}
            className="v5-card w-full max-w-[540px] px-7 py-8 text-left sm:px-10"
          >
            <div className="flex items-center justify-between border-b border-[#ffe8f0] pb-4">
              <span className="rounded-full bg-[#fff0f5] px-3.5 py-1 text-[12px] font-bold text-[#ff477e]">
                {pages[page].badge}
              </span>
              <span className="font-script text-[22px] font-bold text-[#f41f68]">
                {pages[page].recipient}
              </span>
            </div>

            <div className="min-h-[270px] py-6">
              {pages[page].title && (
                <h2 className="font-script mb-4 text-[34px] font-bold text-[#1e293b]">
                  {pages[page].title}
                </h2>
              )}

              <div className="space-y-3 text-[15px] font-semibold leading-relaxed text-[#475569]">
                {pages[page].paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {pages[page].highlightQuote && (
                <div className="mt-6 rounded-2xl bg-[#fff7fa] px-6 py-6 text-center">
                  <p className="font-script text-[34px] font-bold text-[#f41f68]">
                    {pages[page].highlightQuote}
                  </p>
                  <p className="font-script mt-1 text-[20px] text-[#64748b]">
                    {pages[page].highlightSub}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-[#ffe8f0] pt-4">
              {page > 0 ? (
                <button
                  type="button"
                  onClick={() => setPage(0)}
                  className="inline-flex items-center gap-1 text-[14px] font-bold text-[#64748b] hover:text-[#1e293b]"
                >
                  <ChevronLeft size={16} /> Back
                </button>
              ) : (
                <span />
              )}

              {page === 0 ? (
                <button
                  type="button"
                  onClick={() => setPage(1)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#ffe8f0] px-5 py-2.5 text-[14px] font-bold text-[#f41f68] transition hover:bg-[#ffd6e6]"
                >
                  Read More <ChevronRight size={16} />
                </button>
              ) : (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onNext}
                  className="v5-btn-pink !py-2.5 !px-6 !text-[14px]"
                >
                  Continue <ArrowRight size={15} />
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  )
}

export default function BirthdayMessage() {
  return (
    <section className="relative z-10 grid min-h-dvh place-items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass max-w-xl rounded-[2rem] p-8 text-center"
      >
        <div className="text-4xl">💌</div>
        <h2 className="font-script text-4xl text-[#f41f68]">For you, {content.name}</h2>
        <p className="mt-4 text-lg leading-relaxed">{content.message}</p>
      </motion.div>
    </section>
  )
}

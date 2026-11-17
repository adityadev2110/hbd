import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star } from 'lucide-react'
import { content } from '../data/birthdayContent'
import { Confetti, Floaters, V5BackdropDecorations } from './FloatingDecorations'

export function QuizStage({ onNext }) {
  const questions = content.quiz
  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState(null)
  const [done, setDone] = useState(false)

  const current = questions[qIndex]

  const choose = (opt) => {
    if (picked !== null) return
    setPicked(opt)
    const isCorrect = opt === current.answer
    if (isCorrect) setScore((s) => s + 1)

    setTimeout(() => {
      if (qIndex + 1 < questions.length) {
        setQIndex((q) => q + 1)
        setPicked(null)
      } else {
        setDone(true)
      }
    }, 520)
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="v5-stage"
    >
      <V5BackdropDecorations />
      <Floaters items={['♡', '♥', '✨']} count={12} />
      {done && <Confetti count={90} />}

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={`q-${qIndex}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            className="relative z-10 flex w-full max-w-[440px] flex-col items-center"
          >
            <div className="mb-5 flex items-center gap-2 rounded-full border border-[#ffe0eb] bg-white px-5 py-2 shadow-sm">
              {questions.map((_, idx) => {
                const active = idx <= qIndex
                return (
                  <Heart
                    key={idx}
                    size={16}
                    className={active ? 'text-[#ff6b9d]' : 'text-[#ffd6e6]'}
                    fill={active ? '#ffb3c6' : 'none'}
                  />
                )
              })}
            </div>

            <div className="v5-card w-full p-6 sm:p-8">
              <div className="mb-5 rounded-2xl border border-[#ffe4ee] border-t-4 border-t-[#ff85ad] bg-white px-5 py-7 shadow-sm">
                <h2 className="font-display text-[20px] font-bold text-[#2c3545]">
                  {current.question}
                </h2>
              </div>

              <div className="space-y-3 text-left">
                {current.options.map((opt, i) => {
                  const selected = picked === opt
                  return (
                    <motion.button
                      key={i}
                      type="button"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => choose(opt)}
                      className={`w-full rounded-2xl border px-5 py-3.5 text-[15px] font-bold transition ${
                        selected
                          ? 'border-[#ff477e] bg-[#fff0f5] text-[#f41f68]'
                          : 'border-[#f1f5f9] bg-white text-[#334155] hover:border-[#ffd5e3]'
                      }`}
                    >
                      {opt}
                    </motion.button>
                  )
                })}
              </div>

              <p className="mt-5 text-[12px] font-bold text-[#ff477e]">
                Question {qIndex + 1} of {questions.length}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quiz-done"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="v5-card w-full max-w-[440px] px-8 py-11"
          >
            <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#fff0f5] bg-white shadow-md">
              <span className="font-display text-[26px] font-bold text-[#f41f68]">
                {Math.max(score, 5)}/{questions.length}
              </span>
            </div>

            <h1 className="font-script text-[42px] font-bold text-[#1e293b]">
              Quiz Complete :)
            </h1>
            <p className="mt-1 text-[14px] font-semibold text-[#64748b]">
              You got {Math.max(score, 5)} out of {questions.length} right! 💕
            </p>

            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="v5-btn-pink mt-7"
            >
              One Last Thing <Star size={16} fill="currentColor" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  )
}

export default function WishesSection() {
  return (
    <section className="relative z-10 mx-auto max-w-xl px-4 py-16">
      <h2 className="font-script mb-8 text-center text-4xl text-[#f41f68]">Special Wishes</h2>
      <div className="space-y-5">
        {content.wishes.map((w, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass font-script rounded-3xl p-6 text-center text-2xl"
          >
            {w}
          </motion.p>
        ))}
      </div>
    </section>
  )
}

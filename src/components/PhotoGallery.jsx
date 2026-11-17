import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { content } from '../data/birthdayContent'
import { Floaters, V5BackdropDecorations } from './FloatingDecorations'

export function SweetMemoriesStage({ onNext }) {
  const [index, setIndex] = useState(0)
  const photos = content.photos
  const current = photos[index % photos.length]

  const nextPhoto = () => setIndex((i) => (i + 1) % photos.length)

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="v5-stage"
    >
      <V5BackdropDecorations />
      <Floaters items={['♡', '✨', '♥']} count={10} />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <h1 className="font-display text-[36px] font-bold text-[#2c3545] sm:text-[42px]">
          Sweet Memories
        </h1>
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#ffe0eb] bg-white/95 px-5 py-1.5 text-[13px] font-semibold text-[#f41f68] shadow-sm">
          Swipe the photo to see next ✨
        </div>

        <div className="relative mt-7 h-[430px] w-[320px] sm:w-[345px]">
          <div className="absolute inset-0 rotate-[-3deg] rounded-[26px] border border-[#ffe4ee] bg-white/80 shadow-md" />
          <div className="absolute inset-0 rotate-[2.5deg] rounded-[26px] border border-[#ffe4ee] bg-white/90 shadow-md" />

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 45) nextPhoto()
              }}
              onClick={nextPhoto}
              initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, x: 120, rotate: 8 }}
              transition={{ duration: 0.32 }}
              className="relative flex h-full w-full cursor-pointer flex-col justify-between rounded-[26px] border border-[#ffe8f0] bg-white p-4 shadow-[0_20px_50px_rgba(232,118,158,0.2)] select-none"
            >
              <img
                src={current.src}
                alt={current.caption}
                onError={(e) => {
                  if (current.fallback) e.currentTarget.src = current.fallback
                }}
                className="h-[330px] w-full rounded-[18px] object-cover pointer-events-none"
              />
              <p className="font-script py-2 text-[28px] text-[#334155]">
                {current.caption}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onNext}
          className="v5-btn-white mt-7"
        >
          Read My Letter <ArrowRight size={16} />
        </motion.button>
      </div>
    </motion.main>
  )
}

export default function PhotoGallery() {
  const [sel, setSel] = useState(null)
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-4 py-16">
      <h2 className="font-script mb-8 text-center text-4xl text-[#f41f68]">Our Gallery 💗</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
        {content.photos.map((p, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, rotate: i % 2 ? 1.5 : -1.5 }}
            onClick={() => setSel(p)}
            className="glass relative overflow-hidden rounded-3xl p-2 text-left"
            aria-label={`Open ${p.caption}`}
          >
            <img
              src={p.src}
              alt={p.caption}
              onError={(e) => {
                if (p.fallback) e.currentTarget.src = p.fallback
              }}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
            <span className="absolute right-4 top-4">💗</span>
            <p className="px-2 pt-2 text-sm font-semibold">{p.caption}</p>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {sel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSel(null)}
            className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
          >
            <motion.figure
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-h-full max-w-sm text-center text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={sel.src} alt={sel.caption} className="max-h-[75vh] rounded-3xl" />
              <figcaption className="mt-2">{sel.caption}</figcaption>
              <button
                onClick={() => setSel(null)}
                aria-label="Close"
                className="absolute -right-2 -top-2 grid h-10 w-10 place-items-center rounded-full bg-white text-[#f41f68]"
              >
                <X size={18} />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

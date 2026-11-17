import { motion } from 'framer-motion'
import { content } from '../data/birthdayContent'
export default function MemoriesTimeline() {
  return (<section className="relative z-10 mx-auto max-w-2xl px-4 py-16"><h2 className="font-script mb-10 text-center text-4xl text-plum">Our Special Memories</h2>
    <div className="relative border-l-4 border-rose/40 pl-6">
      {content.memories.map((m, i) => <motion.article key={i} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} className="glass relative mb-10 rounded-3xl">
        <span className="absolute -left-[2.35rem] top-6 h-5 w-5 rounded-full border-4 border-white bg-rose" />
        <img src={m.img} alt={m.title} loading="lazy" className="h-44 w-full rounded-t-3xl object-cover" />
        <div className="p-5"><p className="text-xs font-bold uppercase tracking-widest text-rose">{m.date}</p><h3 className="text-xl font-bold">{m.title}</h3><p className="opacity-80">{m.text}</p></div></motion.article>)}
    </div></section>)
}

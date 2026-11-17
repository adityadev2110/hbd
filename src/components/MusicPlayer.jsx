import { useRef, useState } from 'react'
import { Play, Pause, Volume2 } from 'lucide-react'
import { content } from '../data/birthdayContent'
export default function MusicPlayer() {
  const a = useRef(null); const [on, setOn] = useState(false); const [vol, setVol] = useState(.6); const [err, setErr] = useState(false)
  const toggle = async () => { try { if (on) a.current.pause(); else await a.current.play(); setOn(!on) } catch { setErr(true) } }
  return (<div className="glass fixed top-3 right-3 z-50 flex items-center gap-2 rounded-full px-3 py-2">
    <audio ref={a} src={content.music.src} loop preload="none" onError={() => setErr(true)} />
    <button onClick={toggle} aria-label={on ? 'Pause music' : 'Play music'} className="grid h-9 w-9 place-items-center rounded-full bg-rose text-white">{on ? <Pause size={16} /> : <Play size={16} />}</button>
    <Volume2 size={16} aria-hidden /><input aria-label="Volume" type="range" min="0" max="1" step=".05" value={vol} className="w-16 accent-rose"
      onChange={e => { setVol(+e.target.value); if (a.current) a.current.volume = +e.target.value }} />
    {err && <span className="text-[10px] max-w-24 leading-tight">Add public/music/song.mp3</span>}
  </div>)
}

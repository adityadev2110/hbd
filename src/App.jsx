import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import PasswordScreen from './components/PasswordScreen'
import WelcomeScreen from './components/WelcomeScreen'
import BirthdayMessage, { LetterStage } from './components/BirthdayMessage'
import PhotoGallery, { SweetMemoriesStage } from './components/PhotoGallery'
import MemoriesTimeline from './components/MemoriesTimeline'
import BirthdayCake, { FixPicturePuzzleStage } from './components/BirthdayCake'
import WishesSection, { QuizStage } from './components/WishesSection'
import FinalSurprise from './components/FinalSurprise'
import MusicPlayer from './components/MusicPlayer'
import { Floaters } from './components/FloatingDecorations'

export default function App() {
  const [stage, setStage] = useState('lock')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [stage])

  return (
    <MotionConfig reducedMotion="user">
      {stage !== 'lock' && <MusicPlayer />}

      <AnimatePresence mode="wait">
        {stage === 'lock' && (
          <PasswordScreen key="lock" onUnlock={() => setStage('welcome')} />
        )}
        {stage === 'welcome' && (
          <WelcomeScreen key="welcome" onOpen={() => setStage('memories')} />
        )}
        {stage === 'memories' && (
          <SweetMemoriesStage key="memories" onNext={() => setStage('letter')} />
        )}
        {stage === 'letter' && (
          <LetterStage key="letter" onNext={() => setStage('puzzle')} />
        )}
        {stage === 'puzzle' && (
          <FixPicturePuzzleStage key="puzzle" onNext={() => setStage('quiz')} />
        )}
        {stage === 'quiz' && (
          <QuizStage key="quiz" onNext={() => setStage('final')} />
        )}
        {stage === 'final' && (
          <FinalSurprise
            key="final"
            onRelive={() => setStage('welcome')}
            onOpenBonusStory={() => setStage('story')}
          />
        )}
      </AnimatePresence>

      {stage === 'story' && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden bg-[#fff0f5]"
        >
          <Floaters items={['♡', '✦', '♥', '✧', '🌸']} count={18} />
          <BirthdayCake />
          <BirthdayMessage />
          <PhotoGallery />
          <MemoriesTimeline />
          <WishesSection />
          <FinalSurprise onRelive={() => setStage('welcome')} />
        </motion.main>
      )}
    </MotionConfig>
  )
}

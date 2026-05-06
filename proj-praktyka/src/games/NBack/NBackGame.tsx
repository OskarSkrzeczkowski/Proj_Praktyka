import { TimeBar } from '../../components/TimeBar';
import { motion, AnimatePresence } from 'framer-motion';
import { GameButton } from '../../components/GameButtonTF';

interface GameProps {
  totalTime: number;
  formattedTime: string;
  correct: number;
  incorrect: number;
  efficiency: number;
  series: number;
  currentSymbol: string | null;
  stepIndex: number;
  feedback: string | null;
  onExit: () => void;
  onAnswer: (match: boolean) => void;
}

export const NBackGame = ({ totalTime, formattedTime, correct, incorrect, 
  efficiency, series, currentSymbol, stepIndex,feedback, onExit, onAnswer
}: GameProps) => {

    return (
    <div className="fixed inset-0 flex flex-col justify-center p-6 text-white bg-[#033f1a]/20">
      
      <div className="absolute top-0 left-0 right-0 w-full border-b border-white/20">
        <div className="mx-auto flex justify-center h-16 gap-x-64 items-center py-4 px-8">
          <button aria-label="Wróć do menu" onClick={onExit} className="hover:bg-white/10 p-2 rounded-xl transition-colors cursor-pointer">
            <span>&larr; Wróć</span>
          </button>
          <div>Pozostało: <span>{formattedTime}</span></div>
        </div>
      </div>

      <TimeBar totalTime={totalTime} />

      <div className="absolute top-50 left-0 right-0 flex flex-col items-center">
        <div className="flex gap-8">
          <span>Poprawne: <b className="text-green-400">{correct}</b></span>
          <span>Błędne: <b className="text-red-400">{incorrect}</b></span>
          <span>Skuteczność: <b>{efficiency}%</b></span>
          <span>Seria: <b>{series}</b></span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-16">
        <div className="relative h-40 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1 
              key={stepIndex}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="text-[120px] font-black tracking-tighter"
            >
              {currentSymbol}
            </motion.h1>
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {feedback && (
            <motion.div
              key="feedback-notif"
              initial={{ opacity: 0, scale: 0.3, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: -100 }}
              exit={{ opacity: 0, scale: 0.3 }}
              className="absolute z-50 top-90 flex justify-center w-full pointer-events-none"
            >
              <div className={`px-10 py-5 rounded-3xl border-4 font-black text-4xl shadow-2xl
                ${feedback === "Dobrze!" 
                  ? "bg-green-600 border-green-400 text-white" 
                  : feedback === "Błąd!"
                  ? "bg-red-600 border-red-400 text-white"
                  : "bg-yellow-400 border-yellow-600 text-white"
                }`}
              >
                {feedback}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-8 w-full max-w-md">
  
            <GameButton 
                label="TAK" 
                variant="yes" 
                onClick={() => onAnswer(true)} 
            />

            <GameButton 
                label="NIE" 
                variant="no" 
                onClick={() => onAnswer(false)} 
            />

        </div>
      </div>
    </div> 
  );
}
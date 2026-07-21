import { GameHeader, TimeBar } from '@clarity/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { GameButton } from '@clarity/ui';
import { FEEDBACK } from '@clarity/game-logic';

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
      
    <GameHeader formattedTime={formattedTime} onExit={onExit} />

      <TimeBar totalTime={totalTime} />

      <div className="flex flex-col items-center justify-center w-full flex-1">
        
        <div className="flex gap-8 text-lg">
          <span>Poprawne: <b className="text-green-400">{correct}</b></span>
          <span>Błędne: <b className="text-red-400">{incorrect}</b></span>
          <span>Skuteczność: <b>{efficiency}%</b></span>
          <span>Seria: <b>{series}</b></span>
        </div>

        <div className="h-24 flex items-center justify-center w-full">
          <AnimatePresence>
            {feedback && (
              <motion.div
                key="feedback-notif"
                initial={{ opacity: 0, scale: 0.3, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.3 }}
                className="flex justify-center pointer-events-none"
              >
                <div className={`px-10 py-4 rounded-3xl border-4 font-black text-3xl shadow-xl
                     ${feedback === FEEDBACK.Correct 
                        ? "bg-green-600 border-green-400 text-white" 
                        : feedback === FEEDBACK.Wrong
                        ? "bg-red-600 border-red-400 text-white"
                        : "bg-yellow-400 border-yellow-600 text-white"
                    }`}
                >
                {feedback}
            </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1 
              key={stepIndex}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="text-[80px] md:text-[140px] font-black tracking-tighter leading-none"
            >
              {currentSymbol}
            </motion.h1>
          </AnimatePresence>
        </div>

        <div className="flex gap-8 w-full max-w-md justify-center mt-12">
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
};

import {motion, AnimatePresence} from 'framer-motion';
import { TimeBar } from '../../components/TimeBar';

interface GameProps {
  timeLeft: number;
  totalTime: number;
  formattedTime: string;
  score: number;
  displayTime: number;
  feedback: string | null;
  avgTime: string;
  losses: string; 
  onExit: () => void;
  onAnswer: () => void;
}

export const ReactionGame = ({
timeLeft, totalTime, formattedTime, score, avgTime, losses, displayTime, feedback, onExit, onAnswer
}: GameProps) => {

    const counter = displayTime > 0 
            ? displayTime.toString().padStart(4, '0') 
            : "0000";

    const opacityClasses = ["text-white", "text-white/70", "text-white/50", "text-white/30",]

    return (
    <div className="fixed inset-0 flex flex-col justify-center p-6 text-white">
      <div className="absolute top-0 left-0 right-0 w-full border-b border-white">
        <div className="mx-auto flex justify-center h-16 gap-x-64 items-center py-4 px-8">
          <button aria-label="Wróć do menu" onClick={onExit} className="hover:bg-gray-500 rounded-xl w-24 flex justify-center cursor-pointer">
            <span>&larr; Wróć</span>
          </button>
          <div>Pozostało: <span>{formattedTime}</span></div>
        </div>
      </div>

      <TimeBar timeLeft={timeLeft} totalTime={totalTime} />

            <div className="absolute top-50 left-0 right-0 flex flex-col items-center">
        <div className="flex gap-8">
          <span>Próby: <span className="text-green-400 font-bold">{score}</span></span>
          <span>Średni czas reakcji: <span className="text-red-400 font-bold">{avgTime}</span></span>
          <span>Zaniki <span className="font-bold text-yellow-500">{losses}</span></span>
        </div>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.3 }}
            
            className="absolute left-0 right-0 bottom-144 z-50 w-full flex justify-center"
          >
            <div className={`px-10 py-5 rounded-3xl border-4 font-black text-4xl 
              ${feedback === "Za wcześnie!" 
                ? "bg-yellow-400 border-yellow-600 text-white" 
                : feedback.includes("Trafiono") 
                ? "bg-green-900 border-green-800 text-white" 
                : feedback.includes("Za wolno")
                ? "bg-orange-900 border-orange-800 text-white" 
                : "bg-gray-900 border-gray-800 text-white"}`}
            >
              {feedback}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

        <div className="flex justify-center items-center text-[128px] font-bold hover:cursor-pointer" onClick={onAnswer}>
          <div>
            <h1>
              {counter.split('').map((char, index) => (
                <span key={index} className={opacityClasses[index]}>
                  {char}
                </span>
              ))} 
            </h1>
          </div>
        </div>
      </div>
)}

      

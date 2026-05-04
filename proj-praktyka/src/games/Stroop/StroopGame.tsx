import { TimeBar } from '../../components/TimeBar';
import type { ColorOption } from './Stroop';
import { motion } from 'framer-motion'

interface GameProps {
  totalTime: number;
  formattedTime: string;
  currentWord: ColorOption;
  currentColor: ColorOption;
  COLORS: ColorOption[];
  score: number;
  errors: number;
  efficiency: string; 
  onExit: () => void;
  onAnswer: (colorName: string) => void;
}

export const StroopGame = ({ totalTime, formattedTime, currentWord, 
  currentColor, COLORS, score, errors, efficiency, onExit, onAnswer 
}: GameProps) => {
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
      
      <TimeBar totalTime={totalTime} />
      
      <div className="flex flex-col items-center gap-12">
        <div className="flex gap-8">
          <span>Poprawne: <span className="text-green-400 font-bold">{score}</span></span>
          <span>Błędne: <span className="text-red-400 font-bold">{errors}</span></span>
          <span>Skuteczność: <span className="font-bold">{efficiency}</span></span>
        </div>
        <motion.h2
          key={currentWord.name + currentColor.name}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        className={`text-7xl font-black ${currentColor.colorClass}`}
        >
          {currentWord.name}
        </motion.h2>

        <div className="w-full flex justify-center mt-10">
          <div className="grid grid-cols-2 gap-4 justify-items-center">
            {COLORS.map((colorObj) => (
              <button
                key={colorObj.name}
                onClick={() => onAnswer(colorObj.name)}
                className={`h-24 rounded-2xl text-xl w-64 font-bold transition duration-300 hover:scale-105 cursor-pointer ${colorObj.btnClass}`}
              >
                {colorObj.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
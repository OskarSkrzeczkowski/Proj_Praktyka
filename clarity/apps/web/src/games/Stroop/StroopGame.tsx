import { GameHeader, TimeBar, GameButton } from '@clarity/ui';
import type { ColorOption } from '@clarity/game-logic'; 
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
    <div className="fixed inset-0 flex flex-col justify-center p-6 text-white bg-[#4e0101]/20">
        <GameHeader formattedTime={formattedTime} onExit={onExit} />
      
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
            {COLORS.map((colorObj) => (
              
              <GameButton
                key={colorObj.name}
                label={colorObj.name}
                variant="color"
                colorClass={colorObj.btnClass}
                onClick={() => onAnswer(colorObj.name)}
              />
              
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
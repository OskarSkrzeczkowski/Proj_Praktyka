import type{ ReactionInter } from "../../hooks/useStroopGame";
import { formatMs } from '../../utils/format';

interface EndProps {
  score: number;
  errors: number;
  efficiency: string;
  avgTime: number;
  interference: number;
  congruentCount: number;
  incongruentCount: number;
  onRestart: () => void;
}

export const StroopEnd = ({ score, errors, efficiency, avgTime, interference, congruentCount, incongruentCount, onRestart }: EndProps) => {
    
return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className= "rounded-[15px] p-8 m-0 leading-[40px] text-white redR">
        <h2 className="!leading-18 text-[36px] font-bold">Gotowe</h2>
        <p className="!leading-6 text-white/75">To ćwiczenie pomaga utrzymać klarowność myślenia i ogranicza poznawczy chaos na początku pracy.</p>
        <h3 className="text-xl font-bold !my-6">Twoje wyniki:</h3>
        <div className="grid grid-cols-2 gap-2 justify-items-center w-full !mb-6">
          <div className="bg-[#310606a6] border border-[#4e0101] p-6 rounded-2xl w-3xs flex flex-col justify-center items-center !p-4 cursor-default">
            <p className="text-white/75 text-sm">Poprawne</p>
            <p className="text-3xl font-bold text-purple-400">{score}/{score + errors}</p>
          </div>
          
          <div className="bg-[#310606a6] border border-[#4e0101] p-6 rounded-2xl w-3xs flex flex-col justify-center items-center !p-4 cursor-default">
            <p className="text-white/75 text-sm">Skuteczność</p>
            <p className="text-3xl font-bold text-purple-400">{efficiency}</p>
          </div>
          
          <div className="bg-[#310606a6] border border-[#4e0101] p-6 rounded-2xl w-3xs flex flex-col justify-center items-center !p-4 cursor-default">
            <p className="text-white/75 text-sm">Średni czas reakcji</p>
            <p className="text-3xl font-bold text-purple-400">{formatMs(avgTime)}</p>
          </div>
          
          <div className="bg-[#310606a6] border border-[#4e0101] p-6 rounded-2xl w-3xs flex flex-col justify-center items-center !p-4 cursor-default">
            <p className="text-white/75 text-sm">Efekt interferencji</p>
            <p className="text-3xl font-bold text-purple-400">
                {congruentCount > 0 && incongruentCount > 0
                    ? formatMs(interference)
                    : "0"}</p>
          </div>
        </div>
        <div className="!mb-8">
        <h3 className="text-xl font-bold">Na co to się przekłada?</h3>
        <ul className="!list-disc !px-6">
            <li className="text-white/75">łatwiejsze trzymanie się głównej myśli</li>
            <li className="text-white/75">mniej dygresji i impulsów</li>
            <li className="text-white/75">większa klarowność w mówieniu i pisaniu</li>
            <li className="text-white/75">lepsza jakość pierwszych decyzji w ciągu dnia</li>
        </ul>
        </div>
        <button
          aria-label="Wróć do strony głównej" 
          onClick={onRestart}
          className="w-full bg-purple-700 shadow-lg border-3 border-purple-800 hover:bg-purple-600 rounded-xl h-15 flex justify-center items-center text-white font-bold text-lg cursor-pointer"
        >
          Wróć do menu
        </button>
      </div>
    </div>
  );
};
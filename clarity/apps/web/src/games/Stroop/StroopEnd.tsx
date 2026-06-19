import { formatMs } from '@clarity/utils';
import Button from '@mui/material/Button';
import { GameBox } from '@clarity/ui';

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
      <GameBox gameVariant="stroop" sx={{ p: '32px', m: 0, lineHeight: '40px', color: 'white' }}>
        <h2 className="leading-18 text-[36px] font-bold">Gotowe</h2>
        <p className="leading-6 text-white/75">To ćwiczenie pomaga utrzymać klarowność myślenia i ogranicza poznawczy chaos na początku pracy.</p>
        <h3 className="text-xl font-bold my-6">Twoje wyniki:</h3>
        <div className="grid grid-cols-2 gap-2 justify-items-center w-full mb-6">
          <div className="bg-[#310606a6] border border-[#4e0101] rounded-2xl w-3xs flex flex-col justify-center items-center p-4 cursor-default">
            <p className="text-white/75 text-sm">Poprawne</p>
            <p className="text-3xl font-bold text-purple-400">{score}/{score + errors}</p>
          </div>
          
          <div className="bg-[#310606a6] border border-[#4e0101] rounded-2xl w-3xs flex flex-col justify-center items-center p-4 cursor-default">
            <p className="text-white/75 text-sm">Skuteczność</p>
            <p className="text-3xl font-bold text-purple-400">{efficiency}</p>
          </div>
          
          <div className="bg-[#310606a6] border border-[#4e0101] rounded-2xl w-3xs flex flex-col justify-center items-center p-4 cursor-default">
            <p className="text-white/75 text-sm">Średni czas reakcji</p>
            <p className="text-3xl font-bold text-purple-400">{formatMs(avgTime)}</p>
          </div>
          
          <div className="bg-[#310606a6] border border-[#4e0101] rounded-2xl w-3xs flex flex-col justify-center items-center p-4 cursor-default">
            <p className="text-white/75 text-sm">Efekt interferencji</p>
            <p className="text-3xl font-bold text-purple-400">
                {congruentCount > 0 && incongruentCount > 0
                    ? formatMs(interference)
                    : "0"}</p>
          </div>
        </div>
        <div className="mb-8">
        <h3 className="text-xl font-bold">Na co to się przekłada?</h3>
        <ul className="list-disc px-6">
            <li className="text-white/75">łatwiejsze trzymanie się głównej myśli</li>
            <li className="text-white/75">mniej dygresji i impulsów</li>
            <li className="text-white/75">większa klarowność w mówieniu i pisaniu</li>
            <li className="text-white/75">lepsza jakość pierwszych decyzji w ciągu dnia</li>
        </ul>
        </div>
        <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={onRestart}
            sx={{ 
                height: 60, 
                borderRadius: '12px', 
                fontWeight: 'bold', 
                fontSize: '1.125rem' 
            }}
        >
            Wróć do menu
        </Button>
      </GameBox>
    </div>
  );
};
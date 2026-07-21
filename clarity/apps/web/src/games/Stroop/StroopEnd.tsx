import Button from '@mui/material/Button';
import { GameBox, StatCard } from '@clarity/ui';
import CircularProgress from '@mui/material/CircularProgress';

interface EndProps {
  score: number;
  errors: number;
  efficiency: string;
  avgTime: number;
  interference: number;
  congruentCount: number;
  incongruentCount: number;
  onRestart: () => void;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
}

export const StroopEnd = ({ score, errors, efficiency, avgTime, interference, congruentCount, incongruentCount, onRestart, saveStatus }: EndProps) => {

    const renderSaveStatus = () => {
        switch (saveStatus) {
            case 'saving':
                return <div className="flex items-center gap-2 text-white/50"><CircularProgress size={16} color="inherit" /> Zapisywanie...</div>;
            case 'saved':
                return <div className="text-green-500 font-bold">✅ Wyniki zostały zapisane</div>;
            case 'error':
                return <div className="text-red-500 font-bold">⚠️ Wystąpił błąd podczas zapisu</div>;
            default:
                return null;
        }
    };
    
return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <GameBox gameVariant="stroop" sx={{ p: '32px', m: 0, lineHeight: '40px', color: 'white' }}>
        <h2 className="leading-18 text-[36px] font-bold">Gotowe</h2>
        <p className="leading-6 text-white/75">To ćwiczenie pomaga utrzymać klarowność myślenia i ogranicza poznawczy chaos na początku pracy.</p>
        <h3 className="text-xl font-bold my-6">Twoje wyniki:</h3>
        <div className="grid grid-cols-2 gap-4 justify-items-center w-full max-w-2xl mx-auto mb-6">
  <StatCard 
    label="Poprawne" 
    valueText={`${score}/${score + errors}`} 
    color="#c084fc" 
    className="bg-[#310606a6] border-[#4e0101] w-full"
  />
  
  <StatCard 
    label="Skuteczność" 
    valueText={efficiency} 
    color="#c084fc" 
    className="bg-[#310606a6] border-[#4e0101] w-full"
  />
  
  <StatCard 
    label="Średni czas reakcji" 
    value={avgTime} 
    unit="ms" 
    color="#c084fc" 
    className="bg-[#310606a6] border-[#4e0101] w-full"
  />
  
  <StatCard 
    label="Efekt interferencji" 
    value={congruentCount > 0 && incongruentCount > 0 ? interference : 0} 
    unit="ms" 
    color="#c084fc" 
    className="bg-[#310606a6] border-[#4e0101] w-full"
  />
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
        <div className="mb-6">{renderSaveStatus()}</div>
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
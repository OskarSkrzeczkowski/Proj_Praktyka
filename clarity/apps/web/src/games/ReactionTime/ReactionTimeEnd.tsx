import Button from '@mui/material/Button';
import { GameBox, StatCard } from '@clarity/ui';

interface ReactionEndProps {
  onRestart: () => void;
  score: number;     
  avgTime: string;    
  misses: number;
  bTime: string;     
}

export const ReactionEnd = ({onRestart, score, avgTime, misses, bTime}: ReactionEndProps) => {
    return(
      <div className="min-h-screen w-full flex items-center justify-center p-4">
        <GameBox gameVariant="reaction" sx={{ p: '32px', m: 0, lineHeight: '40px', color: 'white' }}>
          <h2 className="leading-18 text-[36px] font-bold">Gotowe</h2>
          <p className="leading-6 text-white/75">Ćwiczenie skraca mentalny rozruch i pomaga szybciej wejść w tryb działania.</p>
          <h3 className="text-xl font-bold my-6">Twoje wyniki:</h3>
          
          <div className="grid grid-cols-2 gap-4 justify-items-center w-full max-w-2xl mx-auto mb-6">
            <StatCard 
              label="Próby w tej sesji" 
              value={score} 
              color="#c084fc" 
              className="bg-[#0B0352] border-[#070236] w-full"
            />
            
            <StatCard 
              label="Średni czas reakcji" 
              valueText={avgTime} 
              color="#c084fc" 
              className="bg-[#0B0352] border-[#070236] w-full"
            />
            
            <StatCard 
              label="Najszybsza reakcja" 
              valueText={bTime} 
              color="#c084fc" 
              className="bg-[#0B0352] border-[#070236] w-full"
            />
            
            <StatCard 
              label="Zaniki" 
              value={misses} 
              color="#facc15"
              className="bg-[#0B0352] border-[#070236] w-full"
            />
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold">Na co to się przekłada?</h3>
            <ul className="list-disc px-6">
                <li className="text-white/75">szybsze "wejście w dzień" bez kawy i presji</li>
                <li className="text-white/75">mniejsze uczucie ospałości lub rozproszenia</li>
                <li className="text-white/75">lepsza gotowość do pracy wymagającej reakcji i decyzji</li>
                <li className="text-white/75">stabilniejsze tempo działania</li>
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
    )
}
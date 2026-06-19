import { TimeList } from '@clarity/ui'
import { LevelList } from '@clarity/ui'
import Button from '@mui/material/Button';
import { GameBox } from '@clarity/ui';


interface MenuProps {
  selectedDuration: string;
  setSelectedDuration: (time: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  onStart: () => void;
  onBack: () => void;
}

export const NBackMenu = ({selectedDuration, setSelectedDuration, selectedLevel, setSelectedLevel, onStart, onBack}: MenuProps) => {
    return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <GameBox gameVariant="nback" sx={{ p: '32px', m: 0, lineHeight: '40px', color: 'white' }}>
        
        <div>
          <div className="flex gap-100">
            <h2 className="text-[36px] font-bold">Tor myślenia</h2>
            <Button 
                variant="outlined" 
                color="inherit" 
                onClick={onBack}
                sx={{
                    borderRadius: '8px',
                    borderWidth: '2px',
                    textTransform: 'none',
                    fontWeight: 'medium',
                    minWidth: '80px',
                    '&:hover': {
                        borderWidth: '2px',
                        transform: 'scale(1.05)'
                    }
                }}
            >
                Wróć
            </Button>
          </div>
          
          <p className="text-white/75">Ustawia ciągłość myślenia i pamięć roboczą.</p>

          <h4 className="text-[24px] pb-1.5 font-medium">Zasada</h4>
          <p className="text-white/75">TAK = symbol taki sam jak (liczba) pozycji wstecz. NIE = inny.</p>

          <h4 className="text-[24px] pb-1.5 font-medium">Wskazówka</h4>
          <p className="text-white/75">Śledź sekwencję, nie pojedyncze znaki.</p>
        </div>

        <div className="chLevel">
          <h4 className="text-[24px] pb-1.5 font-medium">Wybierz poziom</h4>
            <LevelList onLevelChange={setSelectedLevel} currentLevel={selectedLevel} />
        </div>

        <div className="Time">
          <h4 className="text-[24px] pb-1.5 font-medium">Czas trwania gry</h4>
            <TimeList onTimeChange={setSelectedDuration} currentTime={selectedDuration} />
        </div>

        <div className="pb-8 border-2 border-green-800 border-solid rounded-lg h-24 flex flex-col justify-center bg-green-950/90 p-2.5 my-2.5">
          <h4 className="text-[24px] pb-1.5 font-medium">Sterowanie</h4>
          <div className='grid grid-cols-2 gap-2 text-sm text-muted-foreground'>
            <div className="flex flex-nowrap gap-2 items-center">
              <kbd className="flex h-6 w-6 items-center justify-center bg-green-900 rounded">Y</kbd>
              <span> lub </span>
              <kbd className="flex h-6 w-6 items-center justify-center bg-green-900 rounded">&rarr;</kbd>
              <span> - Tak</span>
            </div>
            
            <div className="flex flex-nowrap gap-2 items-center">
              <kbd className="flex h-6 w-6 items-center justify-center bg-green-900 rounded">N</kbd>
              <span> lub </span>
              <kbd className="flex h-6 w-6 items-center justify-center bg-green-900 rounded">&larr;</kbd>
              <span> - Nie</span>
            </div>
          </div>
        </div>

        <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onStart}
            sx={{ 
                height: 60, 
                borderRadius: '12px', 
                fontWeight: 'bold', 
                fontSize: '1.125rem' 
            }}
        >
            Rozpocznij
        </Button>

      </GameBox>
    </div>
  );
}
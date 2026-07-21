import { GameBox, TimeList, STROOP_ASSETS } from '@clarity/ui';
import { BackButton } from '@clarity/ui';
import Button from '@mui/material/Button';
interface MenuProps {
  selectedDuration: string;
  setSelectedDuration: (time: string) => void;
  onStart: () => void;
  onBack: () => void;
}

const CONTROLS = [
  { src: STROOP_ASSETS.photo1, label: 'Czerwony' },
  { src: STROOP_ASSETS.photo2, label: 'Niebieski' },
  { src: STROOP_ASSETS.photo3, label: 'Zielony' },
  { src: STROOP_ASSETS.photo4, label: 'Żółty' },
];

export const StroopMenu = ({ selectedDuration, setSelectedDuration, onStart, onBack }: MenuProps) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
            <GameBox 
                gameVariant="stroop"
                sx={{ 
                    p: '32px', 
                    m: 0,   
                    lineHeight: '40px', 
                    color: 'white',
                    width: '100%',
                    maxWidth: '768px'
                }}
            >
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[36px] font-bold">Kontrola</h2>
            <BackButton onClick={onBack} />
          </div>
          <p className="text-white/75 mb-4">Aktywuje kontrolę poznawczą – skupienie na tym, co istotne.</p>
          
          <h4 className="text-[24px] pb-1.5 font-medium">Zasada</h4>
          <p className="text-white/75">Kliknij kolor czcionki, nie słowo.</p>
          
          <h4 className="text-[24px] pb-1.5 font-medium">Przykład</h4>
          <p className="text-white/75 mb-6">"NIEBIESKI" na czerwono → kliknij czerwony.</p>
        </div>

        <div className="Time mb-8">
          <h4 className="text-[24px] pb-1.5 font-medium">Czas trwania gry</h4>
          <TimeList onTimeChange={setSelectedDuration} currentTime={selectedDuration} />
        </div>

        <div className="pb-8">
          <h4 className="text-[24px] pb-1.5 font-medium">Sterowanie</h4>
          <div className="flex flex-wrap gap-6 bg-[#310606a6] text-[12px] p-4 border rounded-[15px] border-[#4e0101] items-center justify-center">
            {CONTROLS.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <img className="h-6 w-6" src={item.src} alt={item.label} />
                <span>- {item.label}</span>
              </div>
            ))}
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
};
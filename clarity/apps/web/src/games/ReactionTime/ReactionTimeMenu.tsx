import { TimeList } from '@clarity/ui';
import Button from '@mui/material/Button';
import { GameBox } from '@clarity/ui';
import { BackButton } from '@clarity/ui';

interface MenuProps {
  selectedDuration: string;
  setSelectedDuration: (time: string) => void;
  onStart: () => void;
  onBack: () => void;
}

export const ReactionMenu = ({selectedDuration, setSelectedDuration, onStart, onBack}: MenuProps) => {
    return(
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            <GameBox 
                gameVariant="reaction"
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
                    <h2 className="text-[36px] font-bold">Czujność</h2>
                    <BackButton onClick={onBack} />

                    </div>
                    <p className="text-white/75">Kalibruje czuwanie – szybsze "obudzenie" uwagi.</p>

                    <h4 className="text-[24px] pb-1.5 font-medium">Zasada</h4>
                    <p className="text-white/75">Kliknij gdy pojawi się sygnał</p>

                    <h4 className="text-[24px] pb-1.5 font-medium">Wskazówka</h4>
                    <p className="text-white/75">Ustawienie tempa, nie test szybkości.</p>
                </div>

                <div className="Time">
                    <h4 className="text-[24px] pb-1.5 font-medium">Czas trwania gry</h4>

                    <TimeList onTimeChange={setSelectedDuration} currentTime={selectedDuration} />
                </div>

                <div className="pb-8 border-2 border-blue-800 border-solid rounded-lg h-24 flex flex-col justify-center bg-blue-950 p-2.5 my-2.5">
                    <h4 className="text-[24px] pb-1.5 font-medium">Sterowanie</h4>
                    <div>
                        <p className="leading-none">Spacja lub Enter - Reakcja</p>
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
)}
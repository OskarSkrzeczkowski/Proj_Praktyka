import { TimeList } from '../../components/TimeList';
import photo1 from "../../assets/one_13927766.png";
import photo2 from "../../assets/2_13927999.png";
import photo3 from "../../assets/3_13928041.png";
import photo4 from "../../assets/four_13928087.png";

interface MenuProps {
  selectedDuration: string;
  setSelectedDuration: (time: string) => void;
  onStart: () => void;
}

export const StroopMenu = ({ selectedDuration, setSelectedDuration, onStart }: MenuProps) => {
  return (
    <>
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="redR rounded-[15px] p-8 m-0 leading-[40px] text-white">
        <div>
          <h2 className="text-[36px] font-bold">Kontrola</h2>
          <p className="text-white/75">Aktywuje kontrolę poznawczą – skupienie na tym, co istotne.</p>
          <h4 className="text-[24px] pb-1.5 font-medium">Zasada</h4>
          <p className="text-white/75">Kliknij kolor czcionki, nie słowo.</p>
          <h4 className="text-[24px] pb-1.5 font-medium">Przykład</h4>
          <p className="text-white/75">"NIEBIESKI" na czerwono → kliknij czerwony.</p>
        </div>
        <div className="Time">
          <h4 className="text-[24px] pb-1.5 font-medium">Czas trwania gry</h4>
          <TimeList 
            activeElement='bg-purple-700 shadow-lg border-2 border-purple-400 scale-105' 
            inActiveElement='bg-red-950 border-2 border-red-900 hover:bg-red-920' 
            onTimeChange={setSelectedDuration} 
            currentTime={selectedDuration} 
          />
        </div>
        <div className="pb-8">
          <h4 className="text-[24px] pb-1.5 font-medium">Sterowanie</h4>
          <div className="flex gap-8 bg-[#310606a6] text-[12px] p-4 border rounded-[15px] border-[#4e0101] border-solid items-center justify-center">
            <p className="w-[100px] flex justify-center gap-1.5"><img className="h-6 w-6 relative top-2" src={photo1} alt="czerwony"/>- Czerwony</p>
            <p className="w-[100px] flex justify-center gap-1.5"><img className="h-6 w-6 relative top-2" src={photo2} alt="niebieski"/>- Niebieski</p>
            <p className="w-[100px] flex justify-center gap-1.5"><img className="h-6 w-6 relative top-2" src={photo3} alt="zielony"/>- Zielony</p>
            <p className="w-[100px] flex justify-center gap-1.5"><img className="h-6 w-6 relative top-2" src={photo4} alt="żółty"/>- Żółty</p>
          </div>
        </div>
        <button className="w-full bg-purple-700 shadow-lg border-3 border-purple-800 hover:bg-purple-600 rounded-xl h-15 flex justify-center items-center text-white font-bold text-lg cursor-pointer" onClick = {onStart}>
          Rozpocznij
        </button>
      </div>
    </div>
    </>
  );
};
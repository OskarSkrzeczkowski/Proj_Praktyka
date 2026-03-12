interface NBackEndProps {
  onRestart: () => void;
  score: number; 
  errors: number;
  efficiency: string;
  avgTime: string;
  series:number;     
}

export const NBackEnd = ({onRestart, score, errors, efficiency, avgTime, series}: NBackEndProps) => {

    return(
             <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className= "rounded-[15px] p-8 m-0 leading-[40px] text-white greenR">
        <h2 className="!leading-18 text-[36px] font-bold">Gotowe</h2>
        <p className="!leading-6 text-white/75">To ćwiczenie pomaga utrzymać spójność myśli i łatwiej łączyć informacje w trakcie pracy.</p>
        <h3 className="text-xl font-bold !my-6">Twoje wyniki:</h3>
<div className="grid grid-cols-2 gap-2 justify-items-center w-full !mb-6">
          <div className="bg-green-950/70 border-2 border-green-950 p-6 rounded-2xl w-3xs flex flex-col justify-center items-center !p-4 cursor-default">
            <p className="text-white/75 text-sm">Poprawne odpowiedzi w tej sesji</p>
            <p className="text-3xl font-bold text-purple-400">{score}/{score + errors}</p>
          </div>
          
          <div className="bg-green-950/70 border-2 border-green-950 p-6 rounded-2xl w-3xs flex flex-col justify-center items-center !p-4 cursor-default">
            <p className="text-white/75 text-sm">Średni czas reakcji</p>
            <p className="text-3xl font-bold text-purple-400">{avgTime}</p>
          </div>
          
          <div className="bg-green-950/70 border-2 border-green-950 p-6 rounded-2xl w-3xs flex flex-col justify-center items-center !p-4 cursor-default">
            <p className="text-white/75 text-sm">Skuteczność</p>
            <p className="text-3xl font-bold text-purple-400">{efficiency}</p>
          </div>
          
          <div className="bg-green-950/70 border-2 border-green-950 p-6 rounded-2xl w-3xs flex flex-col justify-center items-center !p-4 cursor-default">
            <p className="text-white/75 text-sm">Największa seria</p>
            <p className="text-3xl font-bold text-yellow-400">{series}</p>
          </div>
        </div>
        <div className="!mb-8">
        <h3 className="text-xl font-bold">Na co to się przekłada?</h3>
        <ul className="!list-disc !px-6">
            <li className="text-white/75">łatwiejsze budowanie argumentów i narracji</li>
            <li className="text-white/75">mniejsze "gubienie wątku"</li>
            <li className="text-white/75">lepsza praca złożona (prezentacje, planowanie, analiza)</li>
            <li className="text-white/75">większa ciągłość myślenia bez przeciążenia</li>
        </ul>
        </div>
        <button 
          onClick={onRestart}
          className="w-full bg-purple-700 shadow-lg border-3 border-purple-800 hover:bg-purple-600 rounded-xl h-15 flex justify-center items-center text-white font-bold text-lg cursor-pointer"
        >
          Wróć do menu
        </button>
      </div>
    </div>

)}
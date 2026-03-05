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
      <div className= "rounded-[15px] p-8 m-0 leading-[40px] text-white blueR">
        <h2 className="!leading-18 text-[36px] font-bold">Gotowe</h2>
        <p className="!leading-6 text-white/75">Ćwiczenie skraca mentalny rozruch i pomaga szybciej wejść w tryb działania.</p>
        <h3 className="text-xl font-bold !my-6">Twoje wyniki:</h3>
<div className="grid grid-cols-2 gap-2 justify-items-center w-full !mb-6">
          <div className="bg-[#0B0352] border border-[#070236] p-6 rounded-2xl w-3xs flex flex-col justify-center items-center !p-4 cursor-default">
            <p className="text-white/75 text-sm">Próby w tej sesji</p>
            <p className="text-3xl font-bold text-purple-400">{score}</p>
          </div>
          
          <div className="bg-[#0B0352] border border-[#070236] p-6 rounded-2xl w-3xs flex flex-col justify-center items-center !p-4 cursor-default">
            <p className="text-white/75 text-sm">Średni czas reakcji</p>
            <p className="text-3xl font-bold text-purple-400">{avgTime}</p>
          </div>
          
          <div className="bg-[#0B0352] border border-[#070236] p-6 rounded-2xl w-3xs flex flex-col justify-center items-center !p-4 cursor-default">
            <p className="text-white/75 text-sm">Najszybsza reakcja</p>
            <p className="text-3xl font-bold text-purple-400">{bTime}</p>
          </div>
          
          <div className="bg-[#0B0352] border border-[#070236] p-6 rounded-2xl w-3xs flex flex-col justify-center items-center !p-4 cursor-default">
            <p className="text-white/75 text-sm">Zaniki</p>
            <p className="text-3xl font-bold text-yellow-400">{misses}</p>
          </div>
        </div>
        <div className="!mb-8">
        <h3 className="text-xl font-bold">Na co to się przekłada?</h3>
        <ul className="!list-disc !px-6">
            <li className="text-white/75">szybsze "wejście w dzień" bez kawy i presji</li>
            <li className="text-white/75">mniejsze uczucie ospałości lub rozproszenia</li>
            <li className="text-white/75">lepsza gotowość do pracy wymagającej reakcji i decyzji</li>
            <li className="text-white/75">stabilniejsze tempo działania</li>
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
import { TimeList } from './TimeList'
import { LevelList } from './LevelList'
import { useState } from 'react'
import { motion } from 'framer-motion';

function NBack(){
    const [isGameActive, setIsGameActive] = useState(false);
    const [selectedDuration, setSelectedDuration] =useState("1 min")
    const [selectedLevel, setSelectedLevel] = useState("1-Back (podstawowy)");

    return(
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
        {!isGameActive ? (
            <div className="min-h-screen w-full flex items-center justify-center p-4">
                <div className="greenR rounded-[15px] p-8 m-0 leading-[40px] text-white">
                    <div>
                        <h2 className="text-[36px] font-bold">Tor myślenia</h2>
                        <p className="text-white/75">Ustawia ciągłość myślenia i pamięć roboczą.</p>

                        <h4 className="text-[24px] pb-1.5 font-medium">Zasada</h4>
                        <p className="text-white/75">TAK = symbol taki sam jak 1 pozycji wstecz. NIE = inny.</p>

                        <h4 className="text-[24px] pb-1.5 font-medium">Wskazówka</h4>
                        <p className="text-white/75">Śledź sekwencję, nie pojedyncze znaki.</p>
                    </div>
                <div className="chLevel">
                    <h4 className="text-[24px] pb-1.5 font-medium">Wybierz poziom</h4>
                    <LevelList activeElement='bg-purple-700 shadow-lg border-2 border-purple-400 scale-105' inActiveElement='bg-green-950 border-2 border-green-800 hover:bg-green-940' onLevelChange={setSelectedLevel} currentLevel={selectedLevel}/>
                </div>
                <div className="Time">
                    <h4 className="text-[24px] pb-1.5 font-medium">Czas trwania gry</h4>
                    <TimeList
                        activeElement='bg-purple-700 shadow-lg border-2 border-purple-400 scale-105'
                        inActiveElement='bg-green-950 border-2 border-green-800 hover:bg-green-900'
                        onTimeChange={setSelectedDuration} 
                        currentTime={selectedDuration}>
                    </TimeList>
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
                <div onClick={() => setIsGameActive(true)}>
                    <h3 className="bg-purple-700 shadow-lg border-3 border-purple-800 hover:bg-purple-600 rounded-xl h-15 flex justify-center items-center text-white font-bold text-lg cursor-pointer">Rozpocznij</h3>
                </div>
                </div>
            </div>
        ) : (
            <div className="text-white">
                <h1>Gra się rozpoczęła!</h1>
                <button onClick={() => setIsGameActive(false)}>Wróć do menu</button>
            </div>
        )}
        </motion.div>
)}
export default NBack
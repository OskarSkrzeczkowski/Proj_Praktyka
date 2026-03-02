import { TimeList } from './TimeList'
import { useState } from 'react'
import { motion } from 'framer-motion';

function Reaction(){
    //Ten stan odnosi się do tego czy gra jest aktualnie w działaniu.
    const [isGameActive, setIsGameActive] = useState(false);
    //Ten stan odnosi się do wyboru czasu przez użytkownika z poziomu pola z instrukcją.
    const [selectedDuration, setSelectedDuration] =useState("1 min")

    return(
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
        {!isGameActive ? (
            <div className="min-h-screen w-full flex items-center justify-center p-4">
                <div className="blueR rounded-[15px] p-8 m-0 leading-[40px] text-white">
                    <div>
                        <h2 className="text-[36px] font-bold">Czujność</h2>
                        <p className="text-white/75">Kalibruje czuwanie – szybsze "obudzenie" uwagi.</p>

                        <h4 className="text-[24px] pb-1.5 font-medium">Zasada</h4>
                        <p className="text-white/75">Kliknij gdy pojawi się sygnał</p>

                        <h4 className="text-[24px] pb-1.5 font-medium">Wskazówka</h4>
                        <p className="text-white/75">Ustawienie tempa, nie test szybkości.</p>
                    </div>

                    <div className="Time">
                        <h4 className="text-[24px] pb-1.5 font-medium">Czas trwania gry</h4>
                        <TimeList
                           activeElement='bg-purple-700 shadow-lg border-2 border-purple-400 scale-105'
                           inActiveElement='bg-blue-950 border-2 border-blue-800 hover:bg-blue-940'
                           onTimeChange={setSelectedDuration} 
                           currentTime={selectedDuration}
                        ></TimeList>
                    </div>

                    <div className="pb-8 border-2 border-blue-800 border-solid rounded-lg h-24 flex flex-col justify-center bg-blue-950 p-2.5 my-2.5">
                        <h4 className="text-[24px] pb-1.5 font-medium">Sterowanie</h4>
                        <div>
                            <p className="leading-none">Spacja lub Enter - Reakcja</p>
                        </div>
                    </div>

                    <div onClick={() => setIsGameActive(true)}>
                            <h3 className="bg-purple-700 shadow-lg border-3 border-purple-800 hover:bg-purple-600 rounded-xl h-15 flex justify-center items-center text-white font-bold text-lg cursor-pointer">Rozpocznij</h3>
                    </div>
                </div>
            </div>
        ) : (
            //Ekran gry
            <div className="text-white">
                <h1>Gra się rozpoczęła!</h1>
                <button onClick={() => setIsGameActive(false)}>Wróć do menu</button>
            </div>
        )}

        </motion.div>
    );
}

export default Reaction;
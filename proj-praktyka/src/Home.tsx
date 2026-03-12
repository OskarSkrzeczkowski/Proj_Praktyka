import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion';
import { Card } from './components/Card.tsx'
import PhotoOne from './assets/red.png'
import PhotoTwo from './assets/blue.png'
import PhotoThree from './assets/green2.png'
import { useLocation, Routes, Route} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Stroop from './games/Stroop/Stroop.tsx'
import Reaction from './games/ReactionTimes/ReactionTime'
import NBack from './games/NBack/NBack.tsx'

function Home() {
      //Aktualna ścieżka
      const location = useLocation(); 
      
      //Ten stan przechowuje liczbę odbytych sesji gry Stroop pobraną z localStorage.
      const [stroopSes, setStroopSes] = useState('0');
      const [reactionSes, setReactionSes] = useState('0');
      const [nbackSes, setNbackSes] = useState('0');

    useEffect(() => {
        const current = localStorage.getItem('stroop_sessions') || '0';
        setStroopSes(current);
    }, [location]);

    useEffect(() => {
        const current = localStorage.getItem('reaction_sessions') || '0';
        setReactionSes(current);
    }, [location]);

    useEffect(() => {
    const current = localStorage.getItem('nback_sessions') || '0';
    setNbackSes(current);
}, [location]);
      
      return(
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="flex flex-col justify-center items-center min-h-screen w-full p-5"
              >
                <header className="flex flex-col items-center justify-center max-w-[100vw] text-center m-10 text-white/80">
                  <h1 className="text-[45px] font-extrabold m-1.5">Rozgrzewka poznawcza</h1>
                  <p className ="text-[20px] font-semibold m-1.5">5 minut, które porządkują uwagę zanim zaczniesz właściwą pracę.</p>
                  <p className ="text-[16px] w-[50vw] m-1.5">Ta aplikacja nie trenuje mózgu i nie testuje inteligencji. Jej celem jest szybkie ustawienie stanu poznawczego: uwagi, czujności i ciągłości myślenia – tak, abyś mógł wejść w pracę bez zbędnego rozruchu.</p>
                </header>
                <div className="flex flex-wrap justify-center gap-8 text-white">
                  <div className="redR rounded-[15px] p-5 m-2.5 text-left max-w-[300px] inline-block transition-transform duration-300 ease-in-out hover:scale-105 text-red-700/60">
                    <Card  
                      path="./Stroop" 
                      img={PhotoOne} 
                      imgAlt="nr 1" 
                      ses={`${stroopSes} sesji`} 
                      name={"Kontrola"} 
                      aname={"Stroop"} 
                      desc={"Porządkuje uwagę i wzmacnia kontrtolę poznawczą."} 
                      borderCol={"border-red-950/70 border-2 text-red-200/80 bg-red-400/40"}
                    />
                  </div>
                  <div className="blueR rounded-[15px] p-5 m-2.5 text-left max-w-[300px] inline-block transition-transform duration-300 ease-in-out hover:scale-105">
                    <Card 
                      path="./Reaction" 
                      img={PhotoTwo} 
                      imgAlt="nr 2" 
                      ses={`${reactionSes} sesji`} 
                      name={"Czujność"} 
                      aname={"Reaction Time"} 
                      desc={"Kalibruje czuwanie i skraca mentalny rozruch."} 
                      borderCol={"border-blue-950 border-2 text-blue-200/80 bg-blue-500/50"}
                    />
                  </div>
                  <div className="greenR rounded-[15px] p-5 m-2.5 text-left max-w-[300px] inline-block transition-transform duration-300 ease-in-out hover:scale-105 text-green-800/80">
                    <Card 
                      path="./NBack" 
                      img={PhotoThree} 
                      imgAlt="nr 3" 
                      ses={`${nbackSes} sesji`} 
                      name={"Tor myślenia"} 
                      aname={"N-Back"} 
                      desc={"Ustawia ciągłość myślenia i aktualizację informacji."} 
                      borderCol={"border-green-950/80 border-2 text-green-200/80 bg-green-500/50"}
                    />
                  </div>
                </div>
                <footer>
                  <p className="text-white/80 italic m-4">To nie jest test. Nie oceniaj wyniku – liczy się wejście w stan.</p>
                </footer>
              </motion.div>
            } />
            <Route path="/Stroop" element={<Stroop />} />
            <Route path="/Reaction" element={<Reaction />} />
            <Route path="/NBack" element={<NBack />} />
          </Routes>
        </AnimatePresence>
      );
    }

export default Home;
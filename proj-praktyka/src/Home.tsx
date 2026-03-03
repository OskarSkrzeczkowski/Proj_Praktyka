import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion';
import { Card } from './components/Card.tsx'
import PhotoOne from './assets/number-1.png'
import PhotoTwo from './assets/number-2.png'
import PhotoThree from './assets/number-3.png'
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

    useEffect(() => {
        const current = localStorage.getItem('stroop_sessions') || '0';
        setStroopSes(current);
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
                <header className="flex flex-col items-center justify-center max-w-[100vw] text-center m-10 text-white">
                  <h1 className="text-[45px] font-extrabold m-1.5">Rozgrzewka poznawcza</h1>
                  <p className ="text-[20px] font-semibold m-1.5">5 minut, które porządkują uwagę zanim zaczniesz właściwą pracę.</p>
                  <p className ="text-[16px] w-[50vw] m-1.5">Ta aplikacja nie trenuje mózgu i nie testuje inteligencji. Jej celem jest szybkie ustawienie stanu poznawczego: uwagi, czujności i ciągłości myślenia – tak, abyś mógł wejść w pracę bez zbędnego rozruchu.</p>
                </header>
                <div className="flex flex-wrap justify-center gap-8 text-white">
                  <div className="redR rounded-[15px] p-5 m-2.5 text-left max-w-[300px] inline-block transition-transform duration-300 ease-in-out hover:scale-105">
                    <Card  
                      path="./Stroop" 
                      img={PhotoOne} 
                      imgAlt="nr 1" 
                      ses={`${stroopSes} sesji`} 
                      name={"Kontrola"} 
                      aname={"Stroop"} 
                      desc={"Porządkuje uwagę i wzmacnia kontrtolę poznawczą."} 
                    />
                  </div>
                  <div className="blueR rounded-[15px] p-5 m-2.5 text-left max-w-[300px] inline-block transition-transform duration-300 ease-in-out hover:scale-105">
                    <Card 
                      path="./Reaction" 
                      img={PhotoTwo} 
                      imgAlt="nr 2" 
                      ses={"0 sesji"} 
                      name={"Czujność"} 
                      aname={"Reaction Time"} 
                      desc={"Kalibruje czuwanie i skraca mentalny rozruch."} 
                    />
                  </div>
                  <div className="greenR rounded-[15px] p-5 m-2.5 text-left max-w-[300px] inline-block transition-transform duration-300 ease-in-out hover:scale-105">
                    <Card 
                      path="NBack" 
                      img={PhotoThree} 
                      imgAlt="nr 3" 
                      ses={"0 sesji"} 
                      name={"Tor myślenia"} 
                      aname={"N-Back"} 
                      desc={"Ustawia ciągłość myślenia i aktualizację informacji."} 
                    />
                  </div>
                </div>
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
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { Card } from './components/Card.tsx';
import PhotoOne from './assets/red.png';
import PhotoTwo from './assets/blue.png';
import PhotoThree from './assets/green2.png';
import { useLocation, Routes, Route, Link} from 'react-router-dom';
import Stroop from './games/Stroop/Stroop.tsx';
import Reaction from './games/ReactionTimes/ReactionTime';
import NBack from './games/NBack/NBack.tsx';
import Stats from './stats/Stats.tsx'
import { useSessionStore } from './store/sessionStore.tsx';
import { Particles } from './stats/components/Particles.tsx';


function Home() {
      const location = useLocation(); 
      const { stroopHistory, reactionHistory, nbackHistory } = useSessionStore();


      const stroopSessions = stroopHistory.length;
      const reactionSessions = reactionHistory.length;
      const nbackSessions = nbackHistory.length;
      

      return(
        <div className="relative min-h-screen w-full">
            <Particles />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: [0, 0.5, 1] }} 
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
                      path="/Stroop" 
                      img={PhotoOne} 
                      imgAlt="nr 1" 
                      ses={`${stroopSessions} sesji`} 
                      name={"Kontrola"} 
                      aname={"Stroop"} 
                      desc={"Porządkuje uwagę i wzmacnia kontrolę poznawczą."} 
                      borderCol={"border-red-950/70 border-2 text-red-200/80 bg-red-400/40"}
                    />
                  </div>
                  <div className="blueR rounded-[15px] p-5 m-2.5 text-left max-w-[300px] inline-block transition-transform duration-300 ease-in-out hover:scale-105">
                    <Card 
                      path="/Reaction" 
                      img={PhotoTwo} 
                      imgAlt="nr 2" 
                      ses={`${reactionSessions} sesji`} 
                      name={"Czujność"} 
                      aname={"Reaction Time"} 
                      desc={"Kalibruje czuwanie i skraca mentalny rozruch."} 
                      borderCol={"border-blue-950 border-2 text-blue-200/80 bg-blue-500/50"}
                    />
                  </div>
                  <div className="greenR rounded-[15px] p-5 m-2.5 text-left max-w-[300px] inline-block transition-transform duration-300 ease-in-out hover:scale-105 text-green-800/80">
                    <Card 
                      path="/NBack" 
                      img={PhotoThree} 
                      imgAlt="nr 3" 
                      ses={`${nbackSessions} sesji`} 
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
                <div>
                    <Link to="/Stats" className="text-white border-4 rounded-lg p-2 bg-white/20">Statystyki</Link>
                </div>
              </motion.div>
            } />
            <Route path="/Stroop" element={<Stroop />} />
            <Route path="/Reaction" element={<Reaction />} />
            <Route path="/NBack" element={<NBack />} />
            <Route path="/Stats" element={<Stats />} />
          </Routes>
        </AnimatePresence>
        </div>
      );
    };

export default Home;
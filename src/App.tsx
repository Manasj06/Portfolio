import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Cursor } from './components/ui/Cursor';
import { LoadingScreen } from './components/sections/LoadingScreen';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Certifications } from './components/sections/Certifications';
import { CurrentLearning } from './components/sections/CurrentLearning';
import { CareerVision } from './components/sections/CareerVision';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = loaded ? '' : 'hidden';
  }, [loaded]);

  return (
    <>
      <Cursor />
      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      </AnimatePresence>
      {loaded && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Certifications />
            <CurrentLearning />
            <CareerVision />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

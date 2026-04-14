import { useEffect, useState, useCallback } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollSection from "./components/ScrollSection";
import CustomCursor from "./components/CustomCursor";
import Loader from "./components/Loader";
import ParticlesBackground from "./components/ParticlesBackground";
import "./styles/_global.scss";

function App() {
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {/* Intro loader */}
      {loading && <Loader onComplete={handleLoaderComplete} />}

      {/* Custom cursor */}
      <CustomCursor />

      {/* Global particle background */}
      <ParticlesBackground />

      {/* Scroll progress bar */}
      <motion.div className="scroll-progress" style={{ scaleX }} />

      {/* Navbar */}
      <Navbar />

      <main className="main-content">
        <ScrollSection className="section-wrapper">
          <Hero />
        </ScrollSection>

        <ScrollSection className="section-wrapper">
          <Work />
        </ScrollSection>

        <ScrollSection className="section-wrapper">
          <Skills />
        </ScrollSection>

        <ScrollSection className="section-wrapper">
          <Projects />
        </ScrollSection>

        <ScrollSection className="section-wrapper">
          <Contact />
        </ScrollSection>
      </main>

      <Footer />
    </>
  );
}

export default App;

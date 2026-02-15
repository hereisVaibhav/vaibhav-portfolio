import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollSection from "./components/ScrollSection";
import "./styles/_global.scss";

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Reset scroll on load
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <Navbar />

      <main className="main-content">
        <ScrollSection className="section-wrapper">
          <Hero />
        </ScrollSection>

        <ScrollSection className="section-wrapper">
          <Work />
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

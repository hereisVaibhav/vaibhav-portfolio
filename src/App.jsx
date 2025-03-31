import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "./styles/_global.scss";

import ParticlesBackground from './components/ParticlesBackground';
import Work from './components/Work';
import Contact from './components/Contact';
import Footer from './components/Footer';





import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";

function App() {
  useEffect(() => {
    window.history.scrollRestoration = "manual"; // Prevents automatic scrolling
    window.scrollTo({ top: 0, behavior: "instant" }); // Instantly moves to top without glitch
  }, []);

  return (
    <>
    <ParticlesBackground />
      <div>
        <Navbar />
        <Hero />
        <Work />
        <Projects />
        <Contact />
        <Footer />
        
      </div>
    </>
  );
}

export default App;


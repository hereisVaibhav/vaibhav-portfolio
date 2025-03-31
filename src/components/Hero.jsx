import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import "../styles/hero.scss";

const Hero = () => {
  // Motion values for 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const offsetX = ((e.clientX - innerWidth / 2) / (innerWidth / 2)) * 50;
      const offsetY = ((e.clientY - innerHeight / 2) / (innerHeight / 2)) * 50;
      x.set(offsetX);
      y.set(offsetY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <motion.div
          className="hero-box"
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1000, // Creates depth effect
          }}
          initial={{ opacity: 0, scale: 0.5, y: 50 }} // More engaging pop-up animation
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }} // Slight hover effect
        >
          <motion.h1
            className="floating-text" // NEW: Floating Animation
            initial={{ y: 10 }}
            animate={{ y: [-5, 5, -5] }} // Smooth floating movement
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Hi, I'm <span>Vaibhav Shingade</span>
          </motion.h1>
          <motion.p
            className="glow-text" // NEW: Glowing Effect
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Code, AI & Innovation – Engineering the Next Revolution
          </motion.p>
          
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import TextScramble from "./TextScramble";
import "../styles/hero.scss";

const roles = [
  "Full Stack Developer",
  "AI / ML Engineer",
  "Published Researcher",
  "Team Leader",
];

const Hero = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const offsetX = e.clientX - innerWidth / 2;
      const offsetY = e.clientY - innerHeight / 2;
      x.set(offsetX);
      y.set(offsetY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <section className="hero" id="home">
      {/* Floating Background */}
      <FloatingIcons />

      {/* Scan‑line overlay for CRT feel */}
      <div className="hero-scanlines" />

      {/* Main Content */}
      <motion.div
        className="hero-box"
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Greeting */}
        <motion.p
          className="hero-greeting"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Hello, I'm
        </motion.p>

        {/* Name with glitch effect */}
        <motion.h1
          className="hero-title glitch"
          data-text="Vaibhav Shingade"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span>Vaibhav Shingade</span>
        </motion.h1>

        {/* Scramble role text */}
        <div className="hero-role">
          <span className="role-prefix">{">"} </span>
          <TextScramble
            phrases={roles}
            className="role-text"
            speed={40}
            pause={2800}
          />
          <span className="role-cursor">|</span>
        </div>

        <p className="hero-subtitle">
          Transforming complex challenges into elegant digital solutions through
          full-stack expertise and AI innovation.
        </p>

        <motion.button
          className="btn-primary"
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px #00A8E8" }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            document
              .getElementById("work")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          <span className="btn-text">Explore Work</span>
          <span className="btn-glow" />
        </motion.button>
      </motion.div>
    </section>
  );
};

// Isolated Background Component
const FloatingIcons = () => {
  const icons = [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      top: "15%",
      left: "15%",
      delay: 0,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
      top: "25%",
      right: "20%",
      delay: 2,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
      bottom: "20%",
      left: "25%",
      delay: 1,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
      bottom: "25%",
      right: "15%",
      delay: 3,
    },
  ];

  return (
    <div className="hero-background-layer">
      {icons.map((icon, index) => (
        <motion.img
          key={index}
          src={icon.src}
          style={{
            position: "absolute",
            top: icon.top,
            left: icon.left,
            right: icon.right,
            bottom: icon.bottom,
            width: "50px",
            opacity: 0.3,
            pointerEvents: "none",
          }}
          animate={{ y: [-20, 20, -20], rotate: [0, 360] }}
          transition={{
            duration: 12 + index,
            repeat: Infinity,
            ease: "linear",
            delay: icon.delay,
          }}
        />
      ))}
    </div>
  );
};

export default Hero;

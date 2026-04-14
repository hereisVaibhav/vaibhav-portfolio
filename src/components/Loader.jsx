import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/loader.scss";

const Loader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const name = "VAIBHAV";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 600); // wait for exit animation
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="loader-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Glitch name */}
          <motion.div
            className="loader-text glitch-loader"
            data-text={name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {name.split("").map((char, i) => (
              <motion.span
                key={i}
                className="loader-char"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.4, ease: "easeOut" }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          {/* Subtitle line */}
          <motion.div
            className="loader-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.p
            className="loader-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            Building the future, one line at a time.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;

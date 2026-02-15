import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ScrollSection = ({ children, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={`scroll-section ${className || ""}`}
    >
      {children}
    </motion.div>
  );
};

export default ScrollSection;

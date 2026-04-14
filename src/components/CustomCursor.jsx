import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "../styles/cursor.scss";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  // Smooth spring for the outer ring (trail)
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const trailSpringX = useSpring(trailX, springConfig);
  const trailSpringY = useSpring(trailY, springConfig);

  const isHovering = useRef(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".social-icon") ||
        target.closest(".work-card-square") ||
        target.closest(".project-card-square") ||
        target.classList.contains("menu-icon") ||
        target.style.cursor === "pointer"
      ) {
        isHovering.current = true;
        if (ringRef.current) ringRef.current.classList.add("cursor-hover");
        if (dotRef.current) dotRef.current.classList.add("cursor-hover");
      }
    };

    const handleMouseOut = () => {
      isHovering.current = false;
      if (ringRef.current) ringRef.current.classList.remove("cursor-hover");
      if (dotRef.current) dotRef.current.classList.remove("cursor-hover");
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  // Hide custom cursor on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      {/* Inner dot — follows instantly */}
      <motion.div
        ref={dotRef}
        className="cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Outer ring — follows with spring delay */}
      <motion.div
        ref={ringRef}
        className="cursor-ring"
        style={{
          x: trailSpringX,
          y: trailSpringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
};

export default CustomCursor;

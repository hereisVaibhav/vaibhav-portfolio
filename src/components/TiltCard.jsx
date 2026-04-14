import { useRef, useCallback } from "react";

const TiltCard = ({ children, className = "", style = {}, onClick }) => {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -12;
    const rotateY = ((x - cx) / cx) * 12;

    el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;

    // Move the holographic shine
    const shine = el.querySelector(".tilt-shine");
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,255,204,0.15) 0%, transparent 60%)`;
      shine.style.opacity = "1";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(600px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";

    const shine = el.querySelector(".tilt-shine");
    if (shine) shine.style.opacity = "0";
  }, []);

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      style={{
        ...style,
        transition: "transform 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div
        className="tilt-shine"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.3s ease",
          zIndex: 2,
        }}
      />
      {children}
    </div>
  );
};

export default TiltCard;

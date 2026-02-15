import { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "transparent",
        },
        particles: {
          number: {
            value: 60, // Number of particles
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.25, // Subtle but visible
          },
          size: {
            value: { min: 1, max: 3 },
          },
          move: {
            enable: true,
            speed: 1.2, // Adjust speed of floating
          },
        },
      }}
    />
  );
};

export default ParticlesBackground;

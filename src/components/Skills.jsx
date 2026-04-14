import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../styles/skills.scss";

const skillRings = [
  {
    label: "Frontend",
    color: "#00A8E8",
    radius: 130,
    duration: 20,
    skills: [
      { name: "React", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
      { name: "JavaScript", icon: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" },
      { name: "HTML/CSS", icon: "https://cdn-icons-png.flaticon.com/512/732/732212.png" },
    ],
  },
  {
    label: "Backend",
    color: "#b529c9",
    radius: 220,
    duration: 30,
    skills: [
      { name: "Node.js", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
      { name: "Python", icon: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
      { name: "MongoDB", icon: "https://cdn-icons-png.flaticon.com/512/9544/9544010.png" },
      { name: "SQL", icon: "https://cdn-icons-png.flaticon.com/512/4248/4248443.png" },
    ],
  },
  {
    label: "AI / Tools",
    color: "#00ffcc",
    radius: 310,
    duration: 40,
    skills: [
      { name: "TensorFlow", icon: "https://cdn-icons-png.flaticon.com/512/5968/5968381.png" },
      { name: "Git", icon: "https://cdn-icons-png.flaticon.com/512/11104/11104671.png" },
      { name: "Docker", icon: "https://cdn-icons-png.flaticon.com/512/919/919853.png" },
      { name: "Figma", icon: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png" },
      { name: "AWS", icon: "https://cdn-icons-png.flaticon.com/512/5968/5968286.png" },
    ],
  },
];

const Skills = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });

  return (
    <section className="skills" id="skills" ref={ref}>
      <h2 className="section-title">Skills & Tech</h2>

      <div className="orbit-system">
        {/* Center nucleus */}
        <motion.div
          className="orbit-nucleus"
          animate={inView ? { scale: [0.9, 1.1, 0.9], boxShadow: [
            "0 0 20px rgba(0,255,204,0.3)",
            "0 0 40px rgba(0,168,232,0.5)",
            "0 0 20px rgba(0,255,204,0.3)",
          ]} : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="nucleus-text">VS</span>
        </motion.div>

        {/* Orbital rings */}
        {skillRings.map((ring, ringIdx) => (
          <div key={ring.label} className="orbit-ring-wrapper" style={{ width: ring.radius * 2, height: ring.radius * 2 }}>
            {/* Ring circle (dashed border) */}
            <div
              className="orbit-ring-line"
              style={{
                borderColor: `${ring.color}22`,
                width: "100%",
                height: "100%",
              }}
            />

            {/* Ring label */}
            <span className="ring-label" style={{ color: ring.color }}>
              {ring.label}
            </span>

            {/* Orbiting skill icons */}
            <motion.div
              className="orbit-track"
              animate={inView ? { rotate: 360 } : { rotate: 0 }}
              transition={{
                duration: ring.duration,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ width: "100%", height: "100%" }}
            >
              {ring.skills.map((skill, i) => {
                const angle = (360 / ring.skills.length) * i;
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * ring.radius;
                const y = Math.sin(rad) * ring.radius;

                return (
                  <motion.div
                    key={skill.name}
                    className="orbit-skill"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      borderColor: `${ring.color}44`,
                    }}
                    // Counter-rotate so icons stay upright
                    animate={inView ? { rotate: -360 } : { rotate: 0 }}
                    transition={{
                      duration: ring.duration,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    whileHover={{ scale: 1.3, zIndex: 100 }}
                    title={skill.name}
                  >
                    <img src={skill.icon} alt={skill.name} />
                    <span className="skill-tooltip">{skill.name}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;

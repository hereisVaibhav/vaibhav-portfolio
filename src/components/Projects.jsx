import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaPython, FaDatabase, FaMobileAlt, FaBrain } from "react-icons/fa";
import "../styles/projects.scss";

const projects = [
  {
    title: "NEXUS WELLNESS",
    desc: "Nexus Wellness empowers healthier living through innovative, science-driven solutions.",
    link: "https://nexus-vt1c.onrender.com/",
    icon: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
    stack: [<FaBrain />, <FaNodeJs />, <FaDatabase />],
    size: "large"
  },
  {
    title: "Genni AI",
    desc: "Advanced LLM-powered assistant designed for structured logical reasoning and automated research synthesis.",
    link: "https://github.com/hereisVaibhav/Genni",
    icon: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
    stack: [<FaBrain />, <FaPython />, <FaReact />],
    size: "tall"
  },
  {
    title: "Cancer Predictor",
    desc: "Deep learning model utilizing convolutional neural networks for early-stage tumor detection with 98% accuracy.",
    link: "#",
    icon: "https://cdn-icons-png.flaticon.com/512/2382/2382443.png",
    stack: [<FaBrain />, <FaPython />],
    size: "wide"
  }
];

const Projects = () => {
  return (
    <section className="projects" id="projects">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Modular Holo-Grid
      </motion.h2>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className={`project-card-holo ${project.size}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => window.open(project.link, "_blank")}
          >
            {/* HUD Background Decorations */}
            <div className="hud-bg">
              <div className="grid-pattern" />
              <div className="hud-circles" />
            </div>

            {/* Scanning Line Animation */}
            <div className="scan-line" />

            <div className="card-content">
              <h3>{project.title}</h3>
              <p>{project.desc}</p>

              <div className="tech-stack">
                {project.stack.map((Icon, i) => (
                  <div key={i} className="tech-icon">{Icon}</div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

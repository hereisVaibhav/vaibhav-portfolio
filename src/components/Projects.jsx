import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import "../styles/projects.scss";

const projects = [
  {
    title: "My-Genni",
    description:
      "A Google Gemini-based API project that answers user queries via the Gemini API and stores their responses. It is a frontend project with functionality similar to Gemini.",
  },
  {
    title: "E-HEALTH CARE: PERSONAL DIAGNOSIS & DETECTION",
    description:
      "A full-stack e-commerce web application that offers two services, each available in Free and Pro versions. Users can access free services, and if they require additional functionality, they can purchase Pro features.",
  },
  {
    title: "Personal A.I Agent",
    description:
      "An AI system capable of performing tasks such as saving dates on a calendar, opening and reading PDFs, summarizing content, and handling advanced AI/ML tasks, including natural language conversations.",
  },
];

const floatingImages = ["assets/AI.png", "assets/Framer.png", "assets/Python.png", "assets/React.png"];
const floatingballs = ["assets/three.png", "assets/js.png"];

const Projects = () => {
  const [currentProject, setCurrentProject] = useState(0);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <motion.section
      className="projects"
      id="projects"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2>My Projects</h2>

      {/* Floating Images */}
      <div className="floating-images">
        {floatingImages.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`Floating Image ${index}`}
            className="floating-icon"
            animate={{ y: [0, -20, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
              delay: index * 0.3,
            }}
          />
        ))}
      </div>

      <div className="carousel-container">
        <button className="nav-button left" onClick={prevProject}>
          ‹
        </button>

        <div className="project-wrapper">
          <ProjectCard key={currentProject} project={projects[currentProject]} />
        </div>

        <button className="nav-button right" onClick={nextProject}>
          ›
        </button>
      </div>

      {/* Floating Images */}
      <div className="floating-images">
        {floatingballs.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`Floating Image ${index}`}
            className="floating-icon"
            animate={{ y: [0, -20, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
              delay: index * 0.3,
            }}
          />
        ))}
      </div>
    </motion.section>
  );
};

const ProjectCard = ({ project }) => {
  // Motion values for 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX / 5);
    y.set(offsetY / 5);
  };

  return (
    <motion.div
      className="project-card"
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </motion.div>
  );
};

export default Projects;

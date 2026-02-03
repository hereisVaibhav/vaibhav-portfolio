import React from "react";
import OrbitGallery from "./CircularGallery";
import "../styles/projects.scss";

const Projects = () => {
  const projects = [
    {
      title: "E-HEALTH CARE",
      desc: "Analyzed and structured 30,000+ healthcare records to improve decision reliability. Focused on data consistency and error reduction.",
      link: "#",
      icon: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png" // Healthcare icon
    },
    {
      title: "Genni",
      desc: "Designed structured conversational flows focused on logical reasoning and insight delivery.",
      link: "https://github.com/hereisVaibhav/Genni",
      icon: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png" // AI/Bot icon
    },
    {
      title: "Portfolio",
      desc: "Modern personal website showing professional journey and skills.",
      link: "https://github.com/hereisVaibhav/vaibhav-portfolio",
      icon: "https://cdn-icons-png.flaticon.com/512/1006/1006771.png"
    },
    {
      title: "Cancer Prediction",
      desc: "A platform utilizing ML models to predict cancer based on medical parameters.",
      link: "#",
      icon: "https://cdn-icons-png.flaticon.com/512/2382/2382443.png" // Medical/Health icon
    }
  ];

  return (
    <section className="projects" id="projects">
      <h2 className="section-title">My Projects</h2>
      <div className="gallery-container">
        <OrbitGallery radius={280} items={projects.map((project, index) => (
          <div className="project-card-square" key={index} onClick={() => window.open(project.link, "_blank")}>
            <div className="icon-wrapper">
              <img src={project.icon} alt={project.title} />
            </div>
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
          </div>
        ))} />
      </div>
    </section>
  );
};

export default Projects;

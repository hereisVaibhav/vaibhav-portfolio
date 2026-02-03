import React from "react";
import OrbitGallery from "./CircularGallery";
import "../styles/work.scss";

const Work = () => {
  const experiences = [
    {
      title: "Researcher",
      // company: "Tech Corp",
      desc: "Build a software & publish a research paper on advancing the crop growth and management using AI/ML.",
      icon: "https://cdn-icons-png.flaticon.com/512/2082/2082631.png" // Research Document
    },
    {
      title: "Team Leader & Consultant",
      company: "COSMIC365.AI",
      desc: "Leading a team of 10-15 members to build a software for the company's Marketplace.",
      icon: "https://cdn-icons-png.flaticon.com/512/912/912318.png" // Team/Leadership
    },
    {
      title: "Business Strategy Intern",
      company: "Software Solutions",
      desc: "Applied data-driven analysis to improve content structure and visual consistency.",
      icon: "https://cdn-icons-png.flaticon.com/512/3076/3076896.png" // Strategy/Chart
    }
  ];

  return (
    <section className="work" id="work">
      <h2 className="section-title">Experience</h2>
      <div className="gallery-container">
        <OrbitGallery radius={220} items={experiences.map((exp, index) => (
          <div className="work-card-square" key={index}>
            <div className="icon-wrapper">
              <img src={exp.icon} alt={exp.title} />
            </div>
            <h3>{exp.title}</h3>
            {exp.company && <h4>{exp.company}</h4>}
            <p>{exp.desc}</p>
          </div>
        ))} />
      </div>
    </section>
  );
};

export default Work;

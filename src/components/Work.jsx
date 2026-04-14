import { motion } from "framer-motion";
import WorkStats from "./WorkStats";
import "../styles/work.scss";
import { link } from "framer-motion/client";

const experiences = [
  {
    title: "Data Science & Buisness Analyst Intern",
    company: "InternsElite",
    date: "2026 - Present",
    desc: "Working with Machine Learning models, including Supervised Learning and Unsupervised Learning & Conducting exploratory data analysis (EDA).",
    tags: ["Data Science & Analysis", "Buisness Strategy", "AI/ML Models", "Data Visualization & Power BI", "EDA"]
  },
  {
    title: "Researcher",
    company: "IJSREM",
    date: "2022 - 2025",
    desc: "Authored research paper on 'Advancing Crop Growth and Management using AI/ML'. Developed predictive models for agricultural optimization.",
    link: "https://ijsrem.com/download/python-driven-software-enhancing-the-growth-and-yield-of-crop-production/",
    tags: ["AI/ML", "Data Analysis", "Python", "Research", "Strategy"]
  },
  {
    title: "Team Leader & Consultant",
    company: "COSMIC365.AI",
    date: "2024 - 2024 (4 Months)",
    desc: "Led a cross-functional team of 15+ members. Architected scalable marketplace solutions and optimized engineering workflows.",
    tags: ["Leadership", "Strategy", "System Design", "Consulting"]
  },
  {
    title: "Business Strategy Intern",
    company: "On Campus (University)",
    date: "2023 - 2024 (3 Months)",
    desc: "Spearheaded data-driven growth strategies. Analyzed user behavior to improve content delivery and visual consistency.",
    tags: ["Business Intelligence", "Marketing", "Data Visualization"]
  }
]

const Work = () => {
  return (
    <section className="work" id="work">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Neural Data Stream
      </motion.h2>

      <WorkStats />

      <div className="timeline-container">
        {experiences.map((exp, index) => (
          <div className="timeline-item" key={index}>
            {/* Animated Node */}
            <div className="timeline-node">
              <motion.div
                className="node-pulse"
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Holographic Card */}
            <motion.div
              className="timeline-card"
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50,
                filter: "blur(10px)"
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)"
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="card-header">
                <div className="header-info">
                  <h3>{exp.title}</h3>
                  <span className="company">{exp.company}</span>
                </div>
              </div>

              <span className="card-date">{exp.date}</span>
              <p className="card-desc">{exp.desc}</p>

              <div className="card-tags">
                {exp.tags.map(tag => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Work;

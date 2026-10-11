import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaBook, FaFlask, FaTag, FaSpinner } from "react-icons/fa";
import "../styles/research.scss";

const papers = [
  {
    title: "Python Driven Software: Enhancing the Growth and Yield of Crop Production",
    journal: "International Journal of Scientific Research in Engineering and Management",
    journalShort: "IJSREM",
    issn: "2582-3930",
    doi: "10.55041/IJSREM38979",
    published: "November 21, 2024",
    author: "Vaibhav Vijay Shingade",
    keywords: ["Software Engineering", "Python", "Sustainable Development", "Data Analysis", "Agriculture"],
    abstract:
      "The research project introduces a Python-driven software program designed to assist farmers in optimizing plant cultivation. The program compiles comprehensive data-driven insights to enhance crop growth and yield through intelligent automation and analysis.",
    link: "https://ijsrem.com/download/python-driven-software-enhancing-the-growth-and-yield-of-crop-production",
    sjif: "8.659",
    inReview: false,
  },
  {
    title: "An LLM-Based Agricultural Decision-Support System Integrating Environmental Monitoring, Disease Diagnosis, and Economic Forecasting",
    journal: "Under Review",
    journalShort: "In Progress",
    author: "Vaibhav Vijay Shingade",
    keywords: ["Large Language Models", "AgriTech", "Disease Diagnosis", "Economic Forecasting", "Environmental Monitoring", "AI"],
    abstract:
      "This paper presents an LLM-powered decision-support system tailored for the agricultural domain. The system unifies real-time environmental sensor data, AI-driven crop disease diagnosis from visual inputs, and economic forecasting models to provide farmers with holistic, actionable guidance — bridging the gap between cutting-edge AI research and ground-level agricultural practice.",
    inReview: true,
  },
];

const ResearchPapers = () => {
  return (
    <section className="research-section" id="research">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Research &amp; Publications
      </motion.h2>

      <p className="research-subtitle">
        Peer-reviewed academic contributions at the intersection of technology and real-world impact.
      </p>

      <div className="research-grid">
        {papers.map((paper, index) => (
          <motion.div
            key={index}
            className={`research-card${paper.inReview ? " in-review" : ""}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            {/* Glow orb */}
            <div className="card-glow" />

            {/* Scan line */}
            <div className="scan-line" />

            {/* Top badge row */}
            <div className="paper-meta-row">
              <span className="journal-badge">
                <FaBook className="badge-icon" />
                {paper.journalShort}
              </span>
              {paper.inReview ? (
                <span className="review-badge">
                  <FaSpinner className="spin-icon" />
                  Under Review
                </span>
              ) : (
                <span className="sjif-badge">SJIF {paper.sjif}</span>
              )}
            </div>

            {/* Title */}
            <h3 className="paper-title">{paper.title}</h3>

            {/* Author & date */}
            <div className="paper-byline">
              <span className="paper-author">{paper.author}</span>
              {paper.published && (
                <>
                  <span className="paper-dot">·</span>
                  <span className="paper-date">{paper.published}</span>
                </>
              )}
            </div>

            {/* Abstract */}
            <p className="paper-abstract">{paper.abstract}</p>

            {/* Keywords */}
            <div className="paper-keywords">
              <FaTag className="kw-icon" />
              {paper.keywords.map((kw, i) => (
                <span key={i} className="keyword-chip">{kw}</span>
              ))}
            </div>

            {/* DOI & ISSN — published only */}
            {!paper.inReview && (
              <div className="paper-ids">
                <span className="paper-id-item">
                  <FaFlask className="id-icon" />
                  DOI: <code>{paper.doi}</code>
                </span>
                <span className="paper-id-item">ISSN: {paper.issn}</span>
              </div>
            )}

            {/* CTA */}
            {paper.inReview ? (
              <div className="coming-soon-cta">
                <FaSpinner className="spin-icon" />
                Publication in Progress
              </div>
            ) : (
              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="read-paper-btn"
              >
                Read Paper <FaExternalLinkAlt className="btn-icon" />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ResearchPapers;

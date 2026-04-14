import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaCopy, FaCheck } from "react-icons/fa";
import "../styles/contact.scss";

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = "vaibhavshingade.work@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    {
      icon: <FaLinkedin />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/vaibhav-shingade-5bb329258/",
      color: "#0077B5",
    },
    {
      icon: <FaGithub />,
      label: "GitHub",
      href: "https://github.com/hereisVaibhav",
      color: "#f5f5f5",
    },
    {
      icon: <FaEnvelope />,
      label: "Email",
      href: `mailto:${email}`,
      color: "#00ffcc",
    },
  ];

  return (
    <section className="contact" id="contact">
      <h2 className="section-title">Get In Touch</h2>

      <div className="contact-terminal">
        {/* Terminal header */}
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <span className="terminal-title">contact@vaibhav ~ %</span>
        </div>

        {/* Terminal body */}
        <div className="terminal-body">
          <motion.div
            className="terminal-line"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="prompt">$</span>
            <span className="command"> echo "Let's build something amazing together"</span>
          </motion.div>

          <motion.div
            className="terminal-line output"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Available for collaborations, freelance, and full-time opportunities.
          </motion.div>

          <motion.div
            className="terminal-line"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <span className="prompt">$</span>
            <span className="command"> cat contact_info.json</span>
          </motion.div>

          <motion.div
            className="terminal-line email-line"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0 }}
          >
            <span className="email-text">{email}</span>
            <button className="copy-btn" onClick={copyEmail} title="Copy email">
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <FaCheck />
                  </motion.span>
                ) : (
                  <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <FaCopy />
                  </motion.span>
                )}
              </AnimatePresence>
              <span className="copy-label">{copied ? "Copied!" : "Copy"}</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Social Links */}
      <div className="social-row">
        {socials.map((social, i) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 * i, duration: 0.5 }}
            whileHover={{
              scale: 1.08,
              boxShadow: `0 0 25px ${social.color}44`,
              borderColor: `${social.color}66`,
            }}
          >
            <span className="social-icon" style={{ color: social.color }}>
              {social.icon}
            </span>
            <span className="social-label">{social.label}</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Contact;

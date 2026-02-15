import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import "../styles/contact.scss";

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <h2 className="section-title">Contact Me</h2>

      <div className="contact-container">
        {/* Phone Dial Animation */}
        <motion.div
          className="phone-dial"
          animate={{ rotate: [0, 360], y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          📞
        </motion.div>

        {/* Social Media Links */}
        <div className="social-links">
          <a href="https://www.linkedin.com/in/vaibhav-shingade-5bb329258/" target="_blank" rel="noopener noreferrer">
            <motion.div
              className="social-icon"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              whileHover={{ scale: 1.2 }}
            >
              <FaLinkedin />
            </motion.div>
          </a>

          <a href="https://github.com/hereisVaibhav?tab=overview&from=2025-02-01&to=2025-02-28" target="_blank" rel="noopener noreferrer">
            <motion.div
              className="social-icon"
              animate={{ y: [-10, 0, -10] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              whileHover={{ scale: 1.2 }}
            >
              <FaGithub />
            </motion.div>
          </a>
        </div>

        <p className="contact-text">
          Available for strategic collaborations and innovative digital projects. Reach out via LinkedIn or GitHub to start a conversation.
        </p>
      </div>
    </section>
  );
};

export default Contact;

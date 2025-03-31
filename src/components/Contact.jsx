import { motion } from "framer-motion";
import "../styles/contact.scss";  

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <h2>Contact Me</h2>

      {/* Phone Dial Animation - More Visible Bounce */}
      <motion.div 
        className="phone-dial"
        animate={{ rotate: [0, 360], y: [0, -40, 0] }} // Increased bounce height
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} // Faster bounce
      >
        📞
      </motion.div>

      {/* Social Media Links */}
      <div className="social-links">
        <a href="https://www.linkedin.com/in/vaibhav-shingade-5bb329258/" target="_blank" rel="noopener noreferrer">
          <motion.img
            src="assets/linkedin.png"  
            alt="LinkedIn"
            className="social-icon"
            animate={{ y: [0, -30, 0] }} // More visible bounce
            transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }} // Faster bounce
          />
        </a>

        <a href="https://github.com/hereisVaibhav?tab=overview&from=2025-02-01&to=2025-02-28" target="_blank" rel="noopener noreferrer">
          <motion.img
            src="assets/github.png"  
            alt="GitHub"
            className="social-icon"
            animate={{ y: [-30, 0, -30] }} // Opposite bounce movement
            transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }} // Faster bounce
          />
        </a>
      </div>
    </section>
  );
};

export default Contact;

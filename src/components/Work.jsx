import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "../styles/work.scss"; // Ensure you have this style file

const workData = [
  { 
    title: "Researcher", 
    description: "Published a research paper on plant agriculture, integrating advanced technologies like Python & Data Science to help farmers predict and optimize plant growth.",
    link: "https://ijsrem.com/download/python-driven-software-enhancing-the-growth-and-yield-of-crop-production/"
  },
  { 
    title: "Ex-Team Lead at COSMIC365.AI", 
    description: "Managed daily operations, conducted weekly progress meetings on website development, and handled frontend tasks for COSMIC365.AI."
  },
];

const Work = () => {
  return (
    <section className="work" id="work">
      <h2>My Experience</h2>
      <div className="work-container">
        {workData.map((work, index) => (
          <WorkCard key={index} work={work} index={index} />
        ))}
      </div>
    </section>
  );
};

const WorkCard = ({ work, index }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  // Add Motion Values for 3D Rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-30, 30], [10, -10]); // Reduced rotation range
  const rotateY = useTransform(x, [-30, 30], [-10, 10]);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [inView, controls]);

  // Handle Mouse Movement only inside the card
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 30;
    const offsetY = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 30;
    x.set(offsetX);
    y.set(offsetY);
  };

  return (
    <motion.div
      ref={ref}
      className="work-card"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000, // Creates depth effect
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 1, delay: index * 0.5 }}
      whileHover={{ scale: 1.05 }} // Smooth hover effect
      onMouseMove={handleMouseMove} // Mouse effect now applies only when hovering
      onMouseLeave={() => { x.set(0); y.set(0); }} // Reset on leave
      onClick={() => work.link && window.open(work.link, "_blank")} // Opens link in new tab
      style={{ cursor: work.link ? "pointer" : "default" }} // Only clickable if a link is present
    >
      <h3>{work.title}</h3>
      <p>{work.description}</p>
    </motion.div>
  );
};

export default Work;

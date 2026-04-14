import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const Counter = ({ value, duration = 2 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, { duration });
    return controls.stop;
  }, [count, value, duration]);

  useEffect(() => {
    return rounded.onChange((v) => setDisplay(v));
  }, [rounded]);

  return <span>{display}</span>;
};

const WorkStats = () => {
  const stats = [
    { label: "Years Experience", value: 3, suffix: "+" },
    { label: "Completed Projects", value: 15, suffix: "+" },
    { label: "Technologies Mastered", value: 12, suffix: "+" },
    { label: "Research Papers", value: 1, suffix: "" },
  ];

  return (
    <div className="work-stats">
      {stats.map((stat, i) => (
        <motion.div 
          key={i} 
          className="stat-item"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="stat-value">
            <Counter value={stat.value} />
            {stat.suffix}
          </div>
          <div className="stat-label">{stat.label}</div>
          <div className="stat-line" />
        </motion.div>
      ))}
    </div>
  );
};

export default WorkStats;

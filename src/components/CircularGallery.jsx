import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/circular-gallery.css";

const OrbitGallery = ({ items, radius = 300 }) => {
    const [currentRadius, setCurrentRadius] = useState(radius);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setCurrentRadius(radius * 0.5); // Reduce radius by half on mobile
            } else {
                setCurrentRadius(radius);
            }
        };

        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [radius]);

    // Dynamic height calculation to ensure it fits
    const containerSize = currentRadius * 2.5;

    return (
        <div
            className="orbit-wrapper"
            style={{
                width: "100%",
                height: `${containerSize}px`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                "--radius": `${currentRadius}px`,
                "--radius-neg": `-${currentRadius}px`,
            }}
        >
            <div
                className="orbit-container"
            >
                {items.map((item, index) => {
                    const duration = 30; // Seconds for full cycle
                    const delay = (index / items.length) * duration;

                    return (
                        <div
                            key={index}
                            className="orbit-item"
                            style={{
                                animation: `rectangle-orbit ${duration}s linear infinite`,
                                animationDelay: `-${delay}s`,
                            }}
                        >
                            <motion.div
                                className="orbit-content"
                                whileHover={{ scale: 1.15, zIndex: 100 }}
                            >
                                {item}
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrbitGallery;

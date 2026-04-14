import { useState, useEffect, useCallback } from "react";

const chars = "!<>-_\\/[]{}—=+*^?#________";

const TextScramble = ({ phrases, className, speed = 50, pause = 2500 }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const scramble = useCallback(
    (newText) => {
      return new Promise((resolve) => {
        const length = Math.max(displayText.length, newText.length);
        let frame = 0;
        const totalFrames = length;

        const update = () => {
          let output = "";
          let complete = 0;

          for (let i = 0; i < length; i++) {
            const targetChar = newText[i] || "";

            if (frame / totalFrames > i / length) {
              // Resolved character
              output += targetChar;
              complete++;
            } else {
              // Still scrambling
              output += chars[Math.floor(Math.random() * chars.length)];
            }
          }

          setDisplayText(output);

          if (complete >= length) {
            resolve();
          } else {
            frame++;
            setTimeout(update, speed);
          }
        };

        update();
      });
    },
    [displayText, speed]
  );

  useEffect(() => {
    let timeout;
    const run = async () => {
      await scramble(phrases[currentIndex]);
      timeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
      }, pause);
    };
    run();
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, phrases, pause]);

  return <span className={className}>{displayText}</span>;
};

export default TextScramble;

"use client";

import React, { JSX } from "react";
import { motion } from "framer-motion";

type SplitTextProps = {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  duration?: number;
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.008,
    },
  },
};

const word = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: "blur(3px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

export default function SplitText({
  text,
  as = "p",
  className,
  delay = 0,
  duration = 0.5,
}: SplitTextProps) {
  const MotionTag = motion(as as any);

  const lines = text.split(/<br\s*\/?>/i);

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      transition={{ delay }}
      style={{ display: "inline-block" }}
    >
      {lines.map((line, lineIndex) => {
        const words = line.trim().split(" ");

        return (
          <React.Fragment key={lineIndex}>
            {words.map((w, i) => (
              <motion.span
                key={i}
                variants={word}
                transition={{
                  duration,
                  type: "spring",
                  damping: 80,
                  stiffness: 800,
                }}
                style={{
                  display: "inline-block",
                  marginRight: "0.25em",
                  whiteSpace: "pre",
                }}
              >
                {w}
              </motion.span>
            ))}

            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </MotionTag>
  );
}

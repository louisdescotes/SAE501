"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  Variants,
} from "framer-motion";
import { useState } from "react";
import "./style.scss";

const headerVariants: Variants = {
  initial: { y: 0, x: "-50%" },
  hovered: { y: 45, x: "-50%" },
  hidden: { y: -45, opacity: 0, x: "-50%" },
};

const Header = () => {
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (current > previous && current > 150) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  });

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate={isHoveringLink ? "initial" : hidden ? "hidden" : "hovered"}
      transition={{ type: "spring", damping: 40, stiffness: 400 }}
      className="header"
    >
      <nav className="header-nav">
        {["I", "II", "III", "IV", "V", "VI", "VII"].map((text, i) => (
          <a
            key={i}
            href={`#${i + 1}`}
            onMouseEnter={() => setIsHoveringLink(true)}
            onMouseLeave={() => setIsHoveringLink(false)}
          >
            {text}
          </a>
        ))}
      </nav>
    </motion.header>
  );
};

export default Header;

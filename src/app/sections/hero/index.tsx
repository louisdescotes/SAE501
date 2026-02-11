"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import "./style.scss";

const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 200], [0, 0]);

  return (
    <section className="hero">
      <motion.div className="hero-title" style={{ opacity, y }}>
        <p className="type-32">dans un monde impatient</p>
        <h1 className="type-64">Retrouvez votre patience</h1>
      </motion.div>
    </section>
  );
};

export default Hero;

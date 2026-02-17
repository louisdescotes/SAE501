"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";

const Loader = ({
  minDuration = 2000,
  onFinish,
}: {
  minDuration?: number;
  onFinish: () => void;
}) => {
  const { active, progress } = useProgress();
  const [minTimePassed, setMinTimePassed] = useState(false);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);
  const lenis = useLenis();

  const x = useMotionValue(0);
  const translateX = useTransform(x, (v) => `${v}%`);

  useEffect(() => {
    if (!lenis) return;

    if (active || !minTimePassed) {
      document.body.style.overflow = "hidden";
      lenis.stop();
    } else {
      document.body.style.overflow = "auto";
      lenis.start();
    }

    return () => {
      document.body.style.overflow = "auto";
      lenis.start();
    };
  }, [active, minTimePassed, lenis]);

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      const current = x.get();
      const next = current + (progress - current) * 0.006;
      x.set(next);
      if (Math.abs(progress - next) > 0.1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [progress, x]);

  useEffect(() => {
    const timer = setTimeout(() => setMinTimePassed(true), minDuration);
    return () => clearTimeout(timer);
  }, [minDuration]);

  useEffect(() => {
    if (!active && minTimePassed) {
      setShouldFadeOut(true);
      const timer = setTimeout(() => onFinish(), 800);
      return () => clearTimeout(timer);
    }
  }, [active, minTimePassed, onFinish]);

  return (
    <motion.div
      className="loading grid-p columns"
      initial={{ opacity: 1 }}
      animate={{ opacity: shouldFadeOut ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="loading-load">
        <motion.div
          style={{ x: translateX, y: "-50%", rotate: "45deg" }}
          className="loading-load-cover"
        />
        <span className="type-215">Chargement...</span>
      </div>
    </motion.div>
  );
};

export default Loader;

"use client";

import "./style.scss";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Props = {
  onTrigger: () => void;
};

export default function ScrollGate({ onTrigger }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!isInView) return;

    let direction = 1;
    let fakeCycles = 0;
    let raf: number;

    const animate = () => {
      setProgress((prev) => {
        let speed = Math.random() * 0.6 + 0.15;
        let next = prev + direction * speed;

        if (next >= 94 && fakeCycles < 5) {
          direction = -1;
          fakeCycles++;
        }

        if (next <= 60 && direction === -1) {
          direction = 1;
        }

        if (fakeCycles >= 5 && next > 85) {
          next += 0.15;
        }

        if (fakeCycles >= 5 && next >= 100) {
          cancelAnimationFrame(raf);

          setTimeout(() => {
            setVisible(false);
            onTrigger();
          }, 400);

          return 100;
        }

        return Math.max(0, Math.min(next, 100));
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isInView, onTrigger]);

  if (!visible) return null;

  return (
    <section ref={ref} className="scroll-gate">
      <div className="scroll-gate__loader">
        <div className="scroll-gate__bar">
          <div
            className="scroll-gate__progress"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p>Chargement {Math.floor(progress)}%</p>
      </div>
    </section>
  );
}

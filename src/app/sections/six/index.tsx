"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { animate, scroll } from "motion";
import "./style.scss";
const images = [
  "/photos/cityscape/1.jpg",
  "/photos/cityscape/2.jpg",
  "/photos/cityscape/3.jpg",
  "/photos/cityscape/4.jpg",
  "/photos/cityscape/5.jpg",
];

const Six = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !horizontalRef.current) return;

    scroll(
      animate(horizontalRef.current, {
        transform: ["none", `translateX(-${(images.length - 1) * 100}vw)`],
      }),
      { target: wrapperRef.current },
    );
  }, []);

  return (
    <section
      className="six-wrapper"
      ref={wrapperRef}
      style={{ height: `${images.length * 100}vh`, position: "relative" }}
    >
      <div
        className="six-sticky"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <motion.div
          className="six-horizontal"
          ref={horizontalRef}
          style={{ display: "flex", width: `${images.length * 100}vw` }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="panel"
              style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img src={src} style={{ width: "300px", height: "400px" }} />
              <h3 style={{ fontSize: "50px", marginTop: "20px" }}>
                #{String(i + 1).padStart(3, "0")}
              </h3>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Six;

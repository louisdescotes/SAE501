"use client";

import { useRef } from "react";

import Scene from "./scene";
import Hero from "./sections/hero";
import One from "./sections/one";
import Two from "./sections/two";
import Three from "./sections/three";
import Four from "./sections/four";
import Five from "./sections/five";

const Home = () => {
  const fourRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <main>
        <Hero />
        <One />
        <Two />
        <Three />
        <Four ref={fourRef} />
        <Five />
      </main>

      <Scene sectionRef={fourRef} />
    </>
  );
};

export default Home;

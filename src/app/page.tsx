"use client";

import { Clouds } from "@react-three/drei";
import Scene from "./scene";
import Hero from "./sections/hero";
import One from "./sections/one";
import Two from "./sections/two";
import Three from "./sections/three";
import Four from "./sections/four";
import Five from "./sections/five";

const Home = () => {
  return (
    <>
      <main>
        <Hero />
        <One />
        <Two />
        <Three />
        <Four />
        <Five />
      </main>
      <Scene />
    </>
  );
};
export default Home;

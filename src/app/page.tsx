"use client";

import { Clouds } from "@react-three/drei";
import Scene from "./scene";
import Hero from "./sections/hero";
import One from "./sections/one";

const Home = () => {
  return (
    <>
      <main>
        <Hero />
        <One />
      </main>
      <Scene />
    </>
  );
};
export default Home;

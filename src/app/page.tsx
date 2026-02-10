"use client";

import { Clouds } from "@react-three/drei";
import Scene from "./scene";
import Hero from "./sections/hero";

const Home = () => {
  return (
    <>
      <main className="grid-p">
        <Hero />
      </main>
      <Scene />
    </>
  );
};
export default Home;

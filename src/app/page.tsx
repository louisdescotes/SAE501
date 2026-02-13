"use client";

import { useRef, useState } from "react";

import Scene from "./scene";
import Hero from "./sections/hero";
import One from "./sections/one";
import Two from "./sections/two";
import Three from "./sections/three";
import Four from "./sections/four";
import Five from "./sections/five";
import Loader from "./loader";

const Home = () => {
  const fourRef = useRef<HTMLElement | null>(null);
  const [loadingFinished, setLoadingFinished] = useState(false);

  return (
    <>
      <Scene sectionRef={fourRef} loadingComplete={loadingFinished} />
      <main>
        <Hero />
        <One />
        <Two />
        <Three />
        <Four ref={fourRef} />
        <Five />
      </main>

      {!loadingFinished && <Loader onFinish={() => setLoadingFinished(true)} />}
    </>
  );
};

export default Home;

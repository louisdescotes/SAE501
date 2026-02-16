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
import Footer from "./sections/footer";
import Seven from "./sections/seven";
import Six from "./sections/six";
import Header from "./sections/header";

const Home = () => {
  const fourRef = useRef<HTMLElement | null>(null);
  const [loadingFinished, setLoadingFinished] = useState(false);

  return (
    <>
      <Header />
      <Scene sectionRef={fourRef} loadingComplete={loadingFinished} />
      <main>
        <Hero />
        <One />
        <Two />
        <Three />
        <Four ref={fourRef} />
        <Five />
        <Six />
        <Seven />
        <Footer />
      </main>

      {!loadingFinished && <Loader onFinish={() => setLoadingFinished(true)} />}
    </>
  );
};

export default Home;

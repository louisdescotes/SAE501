"use client";

import { useEffect, useRef, useState } from "react";

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
import ScrollGate from "../components/fakeLoader/ScrollGate";

const Home = () => {
  const fourRef = useRef<HTMLElement | null>(null);
  const [loadingFinished, setLoadingFinished] = useState(false);

  const [loading, setLoading] = useState(false);
  const [gatePassed, setGatePassed] = useState(false);

  useEffect(() => {
    if (!loading) return;

    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setLoading(false);
      setGatePassed(true);
      document.body.style.overflow = "";
    }, 5000);

    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <>
      <Header />
      {/* <HorribleCookieConsent /> */}
      <Scene sectionRef={fourRef} loadingComplete={loadingFinished} />
      <main>
        <Hero />
        <One />

        {!gatePassed && <ScrollGate onTrigger={() => setGatePassed(true)} />}

        {gatePassed && (
          <>
            <Two />
            <Three />
            <Four ref={fourRef} />
            <Five />
            <Six />
            <Seven />
            <Footer />
          </>
        )}
      </main>

      {/* {!loadingFinished && <Loader onFinish={() => setLoadingFinished(true)} />} */}
    </>
  );
};

export default Home;

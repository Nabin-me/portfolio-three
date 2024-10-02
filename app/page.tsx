"use client";

import Canvas from "./components/Canvas";
import LandingPage from "./components/LandingPage";
import PageElement from "./components/PageElement";

export default function Home() {
  return (
    <>
      <LandingPage />
      <Canvas></Canvas>;
      <PageElement />
    </>
  );
}

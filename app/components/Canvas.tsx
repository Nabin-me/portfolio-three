import { Canvas } from "@react-three/fiber";
import { ThreeTunnel } from "../utils/tunel";
import { Suspense } from "react";

const ThreeCanvas = () => {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
      }}
    >
      <Suspense fallback={null}>
        <ThreeTunnel.Out />
      </Suspense>
    </Canvas>
  );
};

export default ThreeCanvas;

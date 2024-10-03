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
      camera={{
        position: [0, 0, 15],
        fov: 40,
        near: 1,
        far: 50,
      }}
      gl={{
        logarithmicDepthBuffer: true,
        antialias: false,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <ThreeTunnel.Out />
      </Suspense>
    </Canvas>
  );
};

export default ThreeCanvas;

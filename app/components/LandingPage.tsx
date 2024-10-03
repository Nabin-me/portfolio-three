import { EffectComposer, Noise } from "@react-three/postprocessing";
import { Fluid } from "@whatisjery/react-fluid-distortion";
import { ThreeTunnel } from "@/app/utils/tunel";
import { Canvas } from "@react-three/fiber";
import Text from "./Text";
import { BlendFunction } from "postprocessing";

const ThreeScene = () => {
  return (
    <Canvas camera={{ position: [30, 0, -3], fov: 35, near: 1, far: 50 }}>
      <ThreeTunnel.In>
        <EffectComposer>
          <Fluid
            radius={0.05}
            curl={3}
            swirl={2}
            distortion={0.5}
            force={1.5}
            pressure={0.97}
            densityDissipation={0.99}
            velocityDissipation={0.995}
            intensity={0.05}
            blend={0.2}
            showBackground={true}
            backgroundColor="#fff"
            fluidColor="#4a4a4a"
          />
          <Text />
          <Noise
            premultiply
            blendFunction={BlendFunction.NORMAL}
            opacity={0.3}
          />
        </EffectComposer>
      </ThreeTunnel.In>
    </Canvas>
  );
};

const LandingPage = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <ThreeScene />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      ></div>
    </div>
  );
};

export default LandingPage;

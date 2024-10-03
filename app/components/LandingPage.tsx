import { EffectComposer, Noise } from "@react-three/postprocessing";
import { Fluid } from "@whatisjery/react-fluid-distortion";
import { ThreeTunnel } from "@/app/utils/tunel";
import { Canvas } from "@react-three/fiber";
import Text from "./Text";
import { LogoRender } from "./LogoRender";
import { BlendFunction } from "postprocessing";
import { Center, Stats } from "@react-three/drei";
const ThreeScene = () => {
  return (
    <Canvas>
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
            showBackground={true}
            backgroundColor="#fff"
            fluidColor="red"
          />
          <Center>
            <LogoRender />
            <Text />
          </Center>
          <Noise
            premultiply
            blendFunction={BlendFunction.NORMAL}
            opacity={0.2}
          />
        </EffectComposer>
      </ThreeTunnel.In>
      <Stats />
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

import { EffectComposer, Noise } from "@react-three/postprocessing";
import { Fluid } from "@whatisjery/react-fluid-distortion";
import { ThreeTunnel } from "@/app/utils/tunel";
import { Canvas } from "@react-three/fiber";
import Text from "./Text";
import { BlendFunction } from "postprocessing";
import { Stats } from "@react-three/drei";
import { useEffect, useState } from "react";

const NoiseEffect = ({ isMobile }: { isMobile: boolean }) => {
  if (isMobile) return null;
  return (
    <Noise premultiply blendFunction={BlendFunction.NORMAL} opacity={0.2} />
  );
};

const ThreeScene = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <Canvas>
      <ThreeTunnel.In>
        <EffectComposer multisampling={0}>
          <Fluid
            radius={isMobile ? 0.03 : 0.05}
            curl={isMobile ? 2 : 3}
            swirl={isMobile ? 1 : 2}
            distortion={isMobile ? 0.3 : 0.5}
            force={isMobile ? 1 : 1.5}
            pressure={0.97}
            densityDissipation={0.99}
            velocityDissipation={0.995}
            intensity={isMobile ? 0.03 : 0.05}
            showBackground={true}
            backgroundColor="#fff"
            fluidColor="red"
          />
          <Text />
          <NoiseEffect isMobile={isMobile} />
        </EffectComposer>
      </ThreeTunnel.In>
      {process.env.NODE_ENV === "development" && <Stats />}
    </Canvas>
  );
};

const LandingPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <ThreeScene isMobile={isMobile} />
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

import { Float, useGLTF } from "@react-three/drei";
import { Environment } from "@react-three/drei";
import { FC } from "react";

interface LogoProps {
  [key: string]: any;
}

export const LogoRender: FC = () => {
  return (
    <group>
      <Environment preset="city" />
      <ambientLight intensity={Math.PI} />
      <group position={[-5, 0, 0]} rotation={[10, 30, 0]} scale={20}>
        <Float rotationIntensity={0.5} floatIntensity={0.5}>
          <Logo />
        </Float>
      </group>
    </group>
  );
};

const Logo: FC<LogoProps> = (props) => {
  const { scene: logoScene } = useGLTF("/models/logo.glb") as any;
  return <primitive object={logoScene} {...props} />;
};

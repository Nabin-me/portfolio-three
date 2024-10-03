import React, { useRef, useLayoutEffect, useMemo } from "react";
import { Canvas, Object3DNode, useFrame } from "@react-three/fiber";
import {
  Lightformer,
  Environment,
  useMask,
  useGLTF,
  Float,
  Instance,
  Instances,
  CameraControls,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { Group, Mesh, MeshStandardMaterial } from "three";
import { GLTF } from "three-stdlib";

// Types for component props
type BubbleProps = {
  position: [number, number, number];
  scale: number;
  speed: number;
};

type CubeProps = {
  children: React.ReactNode;
  position?: [number, number, number];
};

// Type for the GLTF model
type GLTFResult = GLTF & {
  nodes: {
    Cube: Mesh;
  };
};

// Augment react-three-fiber with custom elements
declare module "@react-three/fiber" {
  interface ThreeElements {
    lightformer: Object3DNode<typeof Lightformer, typeof Lightformer>;
  }
}

export default function PageElement() {
  // Memoize bubble data for performance
  const bubbles = useMemo<BubbleProps[]>(() => {
    return Array.from({ length: 20 }, () => ({
      position: [
        Math.random() * 10 - 5,
        Math.random() * -10 - 5,
        Math.random() * 10 - 5,
      ],
      scale: Math.random() * 0.01 + 0.1,
      speed: Math.random() * 0.02 + 0.001,
    }));
  }, []);

  return (
    <Canvas
      camera={{ position: [30, 0, -3], fov: 35, near: 1, far: 50 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1000,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <ambientLight intensity={0.5} />
      <color attach="background" args={["#fff"]} />
      <Cube position={[0, 0, 0]}>
        <Float rotationIntensity={0.02} floatIntensity={0} speed={0}>
          <Turtle position={[0, -4, 2]} rotation={[90, 0, 30]} scale={8} />
        </Float>
        <Instances>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={10}
            chromaticAberration={0.025}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.2}
            iridescence={1}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 1400]}
          />
          {bubbles.map((props, i) => (
            <Bubble key={i} {...props} />
          ))}
        </Instances>
      </Cube>
      <Environment resolution={1024}>
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer
            intensity={4}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={[10, 10, 1]}
          />
          {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
            <Lightformer
              key={i}
              form="circle"
              intensity={4}
              rotation={[Math.PI / 2, 0, 0]}
              position={[x, 4, i * 4]}
              scale={[4, 1, 1]}
            />
          ))}
          <Lightformer
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={[50, 2, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={[50, 2, 1]}
          />
        </group>
      </Environment>
      <CameraControls
        truckSpeed={0}
        dollySpeed={0}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
      {/* <Stats /> */}
    </Canvas>
  );
}

function Cube({ children, ...props }: CubeProps) {
  const ref = useRef<Group>(null);
  const { nodes } = useGLTF(
    "/models/shapes-transformed.glb"
  ) as unknown as GLTFResult;
  const stencil = useMask(1, true);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.traverse((child) => {
        if (child instanceof Mesh && (child.material as MeshStandardMaterial)) {
          Object.assign(child.material, stencil);
        }
      });
    }
  }, [stencil]);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        scale={[0.61 * 6, 0.8 * 6, 1 * 6]}
        geometry={nodes.Cube.geometry}
      >
        <MeshTransmissionMaterial
          backside
          samples={16}
          color="#D3FFF8"
          thickness={10}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.2}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
        />
      </mesh>
      <group ref={ref}>{children}</group>
    </group>
  );
}

function Bubble({ position, scale, speed }: BubbleProps) {
  const ref = useRef<Mesh>(null);
  const cubeSize = 6; // Assuming the cube is 6 units in size

  useFrame((state) => {
    if (ref.current) {
      // Move the bubble upwards
      ref.current.position.y += speed;

      // Confine the bubble within the cube
      const halfSize = cubeSize / 2;
      ref.current.position.x = Math.max(
        -halfSize,
        Math.min(halfSize, ref.current.position.x)
      );
      ref.current.position.y = Math.max(
        -halfSize,
        Math.min(halfSize, ref.current.position.y)
      );
      ref.current.position.z = Math.max(
        -halfSize,
        Math.min(halfSize, ref.current.position.z)
      );

      // If the bubble reaches the top, reset its position to the bottom
      if (ref.current.position.y >= halfSize) {
        ref.current.position.y = -halfSize;
        ref.current.position.x = Math.random() * cubeSize - halfSize;
        ref.current.position.z = Math.random() * cubeSize - halfSize;
      }

      // Add a slight horizontal movement (confined within the cube)
      ref.current.position.x +=
        Math.sin(state.clock.elapsedTime * speed) * 0.01;
      ref.current.position.z +=
        Math.cos(state.clock.elapsedTime * speed) * 0.01;
    }
  });

  return <Instance ref={ref} position={position} scale={scale} />;
}

function Turtle(props: JSX.IntrinsicElements["group"]) {
  const { scene } = useGLTF("/models/logo.glb");
  return <primitive object={scene} {...props} />;
}

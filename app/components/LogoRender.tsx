import * as THREE from "three";
import {
  MeshTransmissionMaterial,
  useGLTF,
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  Center,
} from "@react-three/drei";
import { FC } from "react";

interface GelatinousCubeProps {
  // Define any props that GelatinousCube might receive
}

interface LogoProps {
  // Define any props that Logo might receive
  [key: string]: any; // Allows passing arbitrary props to the Logo component
}

export const LogoRender: FC = () => {
  return (
    <group>
      <ambientLight intensity={Math.PI} />
      <group position={[0, -2.5, -4]} rotation={[0, 30, 0]}>
        <Center top>
          <GelatinousCube />
        </Center>
        <AccumulativeShadows
          temporal
          frames={100}
          alphaTest={0.9}
          color="#3ead5d"
          colorBlend={1}
          opacity={0}
          scale={20}
        >
          <RandomizedLight
            radius={10}
            ambient={0.5}
            intensity={Math.PI}
            position={[2.5, 8, -2.5]}
            bias={0.001}
          />
        </AccumulativeShadows>
      </group>

      <Environment
        files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr"
        backgroundBlurriness={2}
        backgroundIntensity={0.02}
      />
    </group>
  );
};

const GelatinousCube: FC<GelatinousCubeProps> = (props) => {
  // Static configuration object
  const config = {
    meshPhysicalMaterial: false,
    transmission: 1,
    roughness: 0,
    thickness: 2,
    ior: 1.5,
    chromaticAberration: 0.06,
    anisotropy: 0,
    distortion: 0.2,
    distortionScale: 0.3,
    temporalDistortion: 0.5,
    clearcoat: 1,
    attenuationDistance: 0.5,
    attenuationColor: new THREE.Color("#ffffff"),
    color: new THREE.Color("#fff"),
    bg: new THREE.Color("#fff"),
  };

  const { nodes, materials } = useGLTF(
    "/models/gelatinous_cube-transformed.glb"
  ) as any;
  const { scene: logoScene } = useGLTF("/models/logo.glb") as any;

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.cube1.geometry} position={[-0.56, 0.38, -0.11]}>
        {config.meshPhysicalMaterial ? (
          <meshPhysicalMaterial
            {...config}
            // Add only properties supported by meshPhysicalMaterial if needed
          />
        ) : (
          <MeshTransmissionMaterial
            backside
            background={config.bg}
            transmission={config.transmission}
            roughness={config.roughness}
            thickness={config.thickness}
            ior={config.ior}
            chromaticAberration={config.chromaticAberration}
            anisotropy={config.anisotropy}
            distortion={config.distortion}
            distortionScale={config.distortionScale}
            temporalDistortion={config.temporalDistortion}
            clearcoat={config.clearcoat}
            attenuationDistance={config.attenuationDistance}
            attenuationColor={config.attenuationColor}
            color={config.color}
          />
        )}
      </mesh>
      <mesh
        renderOrder={-100}
        geometry={nodes.cube2.geometry}
        // material={materials.cube_mat}
        material-side={THREE.FrontSide}
        position={[-0.56, 0.38, -0.11]}
      />

      <group position={[-1, 1.7, 0.9]} rotation={[140, 0, -20]} scale={4}>
        <Logo scene={logoScene} />
        <ambientLight intensity={5} />
      </group>
    </group>
  );
};

const Logo: FC<LogoProps> = (props) => {
  return <primitive object={props.scene} {...props} />;
};

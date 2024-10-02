"use client";

import { Text as DreiText } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useMemo } from "react";

const Text = () => {
  const { viewport } = useThree();

  const scale = useMemo(
    () => Math.min(1, viewport.width / 8),
    [viewport.width]
  );

  return (
    <group position={[0, 0, 1]} scale={scale} renderOrder={2}>
      <DreiText
        font="/fonts/Aspekta-400.otf"
        maxWidth={4.2}
        textAlign="center"
        fontSize={0.15}
        lineHeight={1.5}
        position-y={1.3}
        color="#4E5597"
      >
        PORTFOLIO
      </DreiText>

      <DreiText
        font="/fonts/Aspekta-600.otf"
        letterSpacing={-0.07}
        fontSize={0.94}
        renderOrder={1}
        position-y={0.8}
        color="#4E5597"
      >
        UNDER
      </DreiText>

      <DreiText
        font="/fonts/Aspekta-600.otf"
        letterSpacing={-0.07}
        position-y={-0.12}
        fontSize={0.94}
        color="#4E5597"
      >
        CONSTRUCTION
      </DreiText>

      <DreiText
        font="/fonts/Aspekta-400.otf"
        maxWidth={4.2}
        textAlign="center"
        fontSize={0.1}
        lineHeight={1.5}
        position-y={-0.8}
        color="#4E5597"
      >
        THIS SITE IS UNDER CONSTRUCTION. PLEASE CHECK BACK LATER
      </DreiText>
    </group>
  );
};

export default Text;

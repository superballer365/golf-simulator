import { useGLTF } from "@react-three/drei";
import React from "react";
import * as THREE from "three";
import { useBallPosition } from "../stores/SimulationStore";

export default function GolfBall() {
  const mesh = React.useRef<THREE.Mesh>(null!); // We'll eventually want to switch to animating with refs: https://docs.pmnd.rs/react-three-fiber/tutorials/basic-animations#animating-with-refs
  const { scene } = useGLTF("models/golf_ball/scene.gltf");

  const ballPosition = useBallPosition();

  return <primitive ref={mesh} object={scene} position={ballPosition} />;
}

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from "react";

export default function GolfBall() {
  const mesh = React.useRef<THREE.Mesh>(null!);
  const { scene } = useGLTF("models/golf_ball/scene.gltf");

  useFrame(() => {
    mesh.current.rotateX(0.01);
  });

  return <primitive ref={mesh} object={scene} />;
}

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from "react";
import { Vector3 } from "three";

interface GolfBallProps {
  position: Vector3;
}

export default function GolfBall({ position }: GolfBallProps) {
  const [initialPosition] = React.useState(position);
  const mesh = React.useRef<THREE.Mesh>(null!);
  const { scene } = useGLTF("models/golf_ball/scene.gltf");

  React.useEffect(() => {
    mesh.current.position.set(position.x, position.y, position.z);
  }, [position]);

  return <primitive ref={mesh} object={scene} position={initialPosition} />;
}

import { Trail, useGLTF } from "@react-three/drei";
import React from "react";
import * as THREE from "three";
import {
  SimulationStatus,
  useBallPosition,
  useSimulationStatus,
} from "../stores/SimulationStore";

export default function GolfBall() {
  const mesh = React.useRef<THREE.Mesh>(null!); // We'll eventually want to switch to animating with refs: https://docs.pmnd.rs/react-three-fiber/tutorials/basic-animations#animating-with-refs
  const { scene } = useGLTF("models/golf_ball/scene.gltf");

  const ballPosition = useBallPosition();
  const simulationStatus = useSimulationStatus();

  // Show the trail if the simulation is in progress or completed.
  const showTrail = [
    SimulationStatus.InProgress,
    SimulationStatus.Complete,
  ].includes(simulationStatus);

  return (
    <>
      {showTrail && (
        <Trail
          // Documentation: https://github.com/pmndrs/drei#trail
          width={5}
          color="white"
          // This seems to be the longest we can make the trail. This is my hack for
          // keeping the trail visible as long as possible
          length={1000}
          target={mesh}
        />
      )}
      <primitive ref={mesh} object={scene} position={ballPosition} />
    </>
  );
}

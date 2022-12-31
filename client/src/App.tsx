import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GolfBall from "./components/GolfBall";
import {
  SimulationStatus,
  useSimulationActions,
  useSimulationStatus,
} from "./stores/SimulationStore";

export default function App() {
  const simulationStatus = useSimulationStatus();
  const { start, reset } = useSimulationActions();

  return (
    <div
      tabIndex={0}
      style={{ width: "100%", height: "100%", backgroundColor: "black" }}
    >
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}>
        <button onClick={reset}>Reset</button>
        <button
          onClick={start}
          disabled={simulationStatus !== SimulationStatus.NotStarted}
        >
          Start
        </button>
      </div>
      <Canvas camera={{ position: [0, 0, 50] }}>
        <primitive object={new THREE.AxesHelper(10)} />
        <primitive
          object={new THREE.GridHelper(100)}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <GolfBall />
        <PhysicsTicker />
        <color attach="background" args={["black"]} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
      </Canvas>
    </div>
  );
}

/**
 * For now use this component to advance the simulation clock at every frame.
 */
function PhysicsTicker() {
  const { advanceSimulation } = useSimulationActions();
  useFrame((state, delta) => {
    advanceSimulation(delta);
  });

  return null;
}

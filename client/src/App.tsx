import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GolfBall from "./components/GolfBall";
import {
  useBallPosition,
  useSimulationActions,
} from "./stores/SimulationStore";

export default function App() {
  const { start, reset } = useSimulationActions();

  return (
    <div
      tabIndex={0}
      style={{ width: "100%", height: "100%", backgroundColor: "black" }}
    >
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}>
        <button onClick={reset}>Reset</button>
        <button onClick={start}>Start</button>
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
 * For now use this component to advance the simulate clock at every frame.
 */
function PhysicsTicker() {
  const { advanceSimulation, complete } = useSimulationActions();
  const ballPosition = useBallPosition();

  useFrame((state, delta) => {
    advanceSimulation(delta);
  });

  // Complete the simulation when the ball crosses the horizontal plane
  React.useEffect(() => {
    if (ballPosition.y <= 0) complete();
  }, [ballPosition, complete]);

  return null;
}

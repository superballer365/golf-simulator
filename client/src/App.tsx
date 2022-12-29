import React, { SetStateAction } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GolfBall from "./components/GolfBall";

const initialBallPosition: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
const initialBallVelocity: THREE.Vector3 = new THREE.Vector3(10, 10, 0);

export default function App() {
  const [ballPosition, setBallPosition] = React.useState(initialBallPosition);
  const [currentTime, setCurrentTime] = React.useState(0);

  const handleResetClick = () => {
    setBallPosition(initialBallPosition);
    setCurrentTime(0);
  };

  return (
    <div
      tabIndex={0}
      style={{ width: "100%", height: "100%", backgroundColor: "black" }}
    >
      <button
        style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}
        onClick={handleResetClick}
      >
        Reset
      </button>
      <Canvas camera={{ position: [0, 0, 50] }}>
        <primitive object={new THREE.AxesHelper(10)} />
        <primitive
          object={new THREE.GridHelper(50)}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <GolfBall position={ballPosition} />
        <PhysicsSimulator
          currentTime={currentTime}
          setBallPosition={setBallPosition}
          setCurrentTime={setCurrentTime}
        />
        <color attach="background" args={["black"]} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
      </Canvas>
    </div>
  );
}

/**
 * @param tSeconds number of seconds since start of simulation
 * @param initialY initial y position
 * @param initialVy initial y velocity
 * @returns the current y position, in meters
 */
function yOt(tSeconds: number, initialY: number, initialVy: number) {
  const yAccel = -9.82; // gravity, in m/s^2
  return initialY + initialVy * tSeconds + 0.5 * yAccel * Math.pow(tSeconds, 2);
}

/**
 * @param tSeconds number of seconds since start of simulation
 * @param initialX initial x position
 * @param initialVx initial x velocity
 * @returns the current x position, in meters
 */
function xOt(tSeconds: number, initialX: number, initialVx: number) {
  return initialX + initialVx * tSeconds;
}

interface PhysicsSimulator {
  currentTime: number;
  setBallPosition: React.Dispatch<SetStateAction<THREE.Vector3>>;
  setCurrentTime: React.Dispatch<SetStateAction<number>>;
}

/**
 * For now use this component to run the "physics" and update the time and element positions.
 */
function PhysicsSimulator({
  currentTime,
  setBallPosition,
  setCurrentTime,
}: PhysicsSimulator) {
  useFrame((state, delta) => {
    const newXPosition = xOt(
      currentTime,
      initialBallPosition.x,
      initialBallVelocity.x
    );
    const newYPosition = yOt(
      currentTime,
      initialBallPosition.y,
      initialBallVelocity.y
    );
    setBallPosition(
      (prev) => new THREE.Vector3(newXPosition, newYPosition, prev.z)
    );
    setCurrentTime((prev) => (prev += delta));
  });

  return null;
}

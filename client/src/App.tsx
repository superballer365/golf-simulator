import React, { SetStateAction } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GolfBall from "./components/GolfBall";

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
 * @param initialVy initial y velocity
 * @returns the current y velocity, in meters
 */
function vyOt(tSeconds: number, initialVy: number) {
  const yAccel = -9.82; // gravity, in m/s^2
  return initialVy + yAccel * tSeconds;
}

const initialBallPosition: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
const initialBallVelocity: THREE.Vector3 = new THREE.Vector3(0, 10, 0);

function App() {
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
        <primitive object={new THREE.GridHelper()} />
        <GolfBall position={ballPosition} />
        <Ticker
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

interface TickerProps {
  currentTime: number;
  setBallPosition: React.Dispatch<SetStateAction<THREE.Vector3>>;
  setCurrentTime: React.Dispatch<SetStateAction<number>>;
}

function Ticker({ currentTime, setBallPosition, setCurrentTime }: TickerProps) {
  useFrame((state, delta) => {
    const newYPosition = yOt(
      currentTime,
      initialBallPosition.y,
      initialBallVelocity.y
    );
    setBallPosition((prev) => new THREE.Vector3(prev.x, newYPosition, prev.z));
    setCurrentTime((prev) => (prev += delta));
  });

  return null;
}

export default App;

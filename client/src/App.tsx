import React from "react";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GolfBall from "./components/GolfBall";

function App() {
  return (
    <div
      tabIndex={0}
      style={{ width: "100%", height: "100%", backgroundColor: "black" }}
    >
      <Canvas camera={{ position: [0, 5, 0] }}>
        <primitive object={new THREE.AxesHelper(10)} />
        <primitive object={new THREE.GridHelper()} />
        <GolfBall />
        <color attach="background" args={["black"]} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
      </Canvas>
    </div>
  );
}

export default App;

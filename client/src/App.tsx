import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GolfBall from "./components/GolfBall";
import {
  SimulationStatus,
  useBallPosition,
  useSimulationActions,
  useSimulationStatus,
} from "./stores/SimulationStore";
import useUnitHelper from "./hooks/useUnitHelper";
import { DistanceUnits, MeasurementTypes } from "./utils/units";
import {
  usePreferencesActions,
  useUnitPreferences,
} from "./stores/PreferencesStore";

export default function App() {
  const simulationStatus = useSimulationStatus();
  const ballPosition = useBallPosition();
  const { storageToDisplayUnit, formatDisplayValue } = useUnitHelper(
    MeasurementTypes.Distance
  );
  const { start, reset } = useSimulationActions();
  const unitPreferences = useUnitPreferences();
  const { updateUnitPreferences } = usePreferencesActions();

  const [showSettings, setShowSettings] = React.useState(false);

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
        <div
          style={{
            marginTop: "0.25rem",
            padding: "0.5rem",
            backgroundColor: "white",
          }}
        >
          {formatDisplayValue(storageToDisplayUnit(ballPosition.x))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          top: 10,
          right: 10,
          zIndex: 10,
        }}
      >
        <button
          style={{ width: "min-content" }}
          onClick={() => setShowSettings((prev) => !prev)}
        >
          Settings
        </button>
        {showSettings && (
          <div
            style={{
              marginTop: "0.25rem",
              padding: "0.5rem",
              backgroundColor: "white",
            }}
          >
            <label htmlFor="distanceUnits">Distance:</label>
            <select
              value={unitPreferences[MeasurementTypes.Distance]}
              onChange={(e) =>
                updateUnitPreferences({
                  [MeasurementTypes.Distance]: e.target.value as DistanceUnits,
                })
              }
            >
              {Object.values(DistanceUnits).map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        )}
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

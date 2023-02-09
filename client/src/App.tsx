import React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import GolfBall from "./components/GolfBall";
import { useSimulationActions } from "./stores/SimulationStore";
import { useTheme } from "./stores/PreferencesStore";
import { Box, Button, MantineProvider } from "@mantine/core";
import LaunchControls from "./components/LaunchControls";
import Overlay from "./components/Overlay";
import CarryTracker from "./components/CarryTracker";
import SettingsControls from "./components/SettingsControls";
import { OrbitControls, Sky } from "@react-three/drei";
import Ground from "./components/Ground";
import CameraControls from "./components/CameraControls";
import {
  CameraMode,
  useCameraActions,
  useCameraState,
} from "./stores/CameraStore";

export default function App() {
  const controlsRef = React.useRef(null!);
  const theme = useTheme();
  const { setCameraMode } = useCameraActions();

  return (
    <MantineProvider
      theme={{ colorScheme: theme }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Box id="rootContainer" h="100%" w="100%" bg="black">
        <Overlay
          topLeft={
            <Button.Group>
              <LaunchControls />
            </Button.Group>
          }
          topCenter={<CarryTracker />}
          topRight={
            <Button.Group>
              <CameraControls />
              <SettingsControls />
            </Button.Group>
          }
        >
          <Canvas
            camera={{ position: [0, 3, 50] }}
            onPointerDown={() =>
              // As long as we have oribital controls, if the user clicks on
              // the canvas they likely moved the camera from one of its
              // determinate states.
              setCameraMode(CameraMode.Indeterminate)
            }
          >
            {/* NOTE: we may need to introduce a context bridge at some point if we need to use
          information from the matinine context INSIDE of the canvas. We don't have this need
          just yet. See here for more info: 
          https://standard.ai/blog/introducing-standard-view-and-react-three-fiber-context-bridge/ */}
            <OrbitControls ref={controlsRef} target={[0, 10, 0]} />
            <ambientLight />
            <Sky
              distance={450000}
              sunPosition={[5, 1, 8]}
              inclination={0}
              azimuth={0.25}
            />
            <Ground />
            <GolfBall />
            <PhysicsTicker />
            <CameraUpdater controlsRef={controlsRef} />
            {/* <primitive object={new THREE.AxesHelper(10)} />
            <primitive
              object={new THREE.GridHelper(100)}
              rotation={[Math.PI / 2, 0, 0]}
            /> */}
          </Canvas>
        </Overlay>
      </Box>
    </MantineProvider>
  );
}

interface CameraUpdaterProps {
  controlsRef: React.RefObject<any>;
}

function CameraUpdater({ controlsRef }: CameraUpdaterProps) {
  const camera = useThree((state) => state.camera);
  const cameraState = useCameraState();

  React.useEffect(() => {
    if (!cameraState) return;

    const { x: targetX, y: targetY, z: targetZ } = cameraState.target;
    controlsRef.current.target.set(targetX, targetY, targetZ);
    const { x: posX, y: posY, z: posZ } = cameraState.position;
    camera.position.set(posX, posY, posZ);
  }, [cameraState]);

  return null;
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

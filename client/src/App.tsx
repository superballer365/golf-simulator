import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GolfBall from "./components/GolfBall";
import {
  useBallPosition,
  useSimulationActions,
} from "./stores/SimulationStore";
import useUnitHelper from "./hooks/useUnitHelper";
import { MeasurementTypes } from "./utils/units";
import { useTheme } from "./stores/PreferencesStore";
import { ActionIcon, Box, MantineProvider, Text } from "@mantine/core";
import LaunchControls from "./components/LaunchControls";
import { stylesWithThemedBackgroundColor } from "./utils/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import SettingsDialog from "./components/SettingsDialog";
import Overlay from "./components/Overlay";
import CarryTracker from "./components/CarryTracker";

export default function App() {
  const theme = useTheme();

  const [showSettings, setShowSettings] = React.useState(false);

  return (
    <MantineProvider
      theme={{ colorScheme: theme }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Box id="rootContainer" h="100%" w="100%" bg="black">
        <Overlay
          topLeft={<LaunchControls />}
          topCenter={<CarryTracker />}
          topRight={
            <Box
              display="flex"
              sx={{
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <ActionIcon
                variant="transparent"
                color="blue.4"
                onClick={() => setShowSettings(!showSettings)}
              >
                <FontAwesomeIcon icon={faGear} />
              </ActionIcon>
              {showSettings && (
                <SettingsDialog onClose={() => setShowSettings(false)} />
              )}
            </Box>
          }
        >
          <Canvas camera={{ position: [0, 0, 50] }}>
            {/* NOTE: we may need to introduce a context bridge at some point if we need to use
          information from the matinine context INSIDE of the canvas. We don't have this need
          just yet. See here for more info: 
          https://standard.ai/blog/introducing-standard-view-and-react-three-fiber-context-bridge/ */}
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
        </Overlay>
      </Box>
    </MantineProvider>
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

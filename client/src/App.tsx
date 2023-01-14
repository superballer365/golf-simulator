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

export default function App() {
  const ballPosition = useBallPosition();
  const theme = useTheme();
  const { storageToDisplayUnit, formatDisplayValue } = useUnitHelper(
    MeasurementTypes.Distance
  );

  const [showSettings, setShowSettings] = React.useState(false);

  return (
    <MantineProvider
      theme={{ colorScheme: theme }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Box h="100%" w="100%" bg="black" tabIndex={0}>
        <Box pos="absolute" mt="xs" ml="xs" sx={{ zIndex: 10 }}>
          <LaunchControls />
          <Box
            mt="xs"
            p="xs"
            sx={(theme) => stylesWithThemedBackgroundColor(theme)}
          >
            <Text>
              {formatDisplayValue(storageToDisplayUnit(ballPosition.x))}
            </Text>
          </Box>
        </Box>
        <Box
          pos="absolute"
          display="flex"
          top={0}
          right={0}
          mt="xs"
          mr="xs"
          sx={{
            flexDirection: "column",
            alignItems: "flex-end",
            zIndex: 10,
          }}
        >
          <ActionIcon
            variant="transparent"
            color="blue.4"
            onClick={() => setShowSettings(true)}
          >
            <FontAwesomeIcon icon={faGear} />
          </ActionIcon>
          {showSettings && (
            <SettingsDialog onClose={() => setShowSettings(false)} />
          )}
        </Box>
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

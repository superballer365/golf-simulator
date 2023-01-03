import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GolfBall from "./components/GolfBall";
import {
  useBallPosition,
  useSimulationActions,
} from "./stores/SimulationStore";
import useUnitHelper from "./hooks/useUnitHelper";
import {
  AngleUnits,
  DistanceUnits,
  MeasurementTypes,
  SpeedUnits,
} from "./utils/units";
import {
  ThemeType,
  usePreferencesActions,
  useTheme,
  useUnitPreferences,
} from "./stores/PreferencesStore";
import {
  Box,
  Button,
  Container,
  MantineProvider,
  SegmentedControl,
  Select,
  Text,
} from "@mantine/core";
import LaunchControls from "./components/LaunchControls";
import { stylesWithThemedBackgroundColor } from "./utils/styles";

export default function App() {
  const ballPosition = useBallPosition();
  const theme = useTheme();
  const unitPreferences = useUnitPreferences();
  const { updateUnitPreferences, updateTheme } = usePreferencesActions();
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
          <Button
            sx={{ width: "min-content" }}
            onClick={() => setShowSettings((prev) => !prev)}
          >
            Settings
          </Button>
          {showSettings && (
            <Container
              mt="xs"
              p="xs"
              sx={(theme) => stylesWithThemedBackgroundColor(theme)}
            >
              <SegmentedControl
                value={theme}
                data={[
                  { label: "Light", value: "light" },
                  { label: "Dark", value: "dark" },
                ]}
                onChange={(val) => updateTheme(val as ThemeType)}
              />
              <Select
                label="Distance:"
                value={unitPreferences[MeasurementTypes.Distance]}
                onChange={(val) =>
                  val &&
                  updateUnitPreferences({
                    [MeasurementTypes.Distance]: val as DistanceUnits,
                  })
                }
                data={Object.values(DistanceUnits)}
              />
              <Select
                label="Speed:"
                value={unitPreferences[MeasurementTypes.Speed]}
                onChange={(val) =>
                  val &&
                  updateUnitPreferences({
                    [MeasurementTypes.Speed]: val as SpeedUnits,
                  })
                }
                data={Object.values(SpeedUnits)}
              />
              <Select
                label="Angle:"
                value={unitPreferences[MeasurementTypes.Angle]}
                onChange={(val) =>
                  val &&
                  updateUnitPreferences({
                    [MeasurementTypes.Angle]: val as AngleUnits,
                  })
                }
                data={Object.values(AngleUnits)}
              />
            </Container>
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

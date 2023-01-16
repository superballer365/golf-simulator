import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GolfBall from "./components/GolfBall";
import { useSimulationActions } from "./stores/SimulationStore";
import { useTheme } from "./stores/PreferencesStore";
import { Box, MantineProvider } from "@mantine/core";
import LaunchControls from "./components/LaunchControls";
import Overlay from "./components/Overlay";
import CarryTracker from "./components/CarryTracker";
import SettingsControls from "./components/SettingsControls";

export default function App() {
  const theme = useTheme();

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
          topRight={<SettingsControls />}
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

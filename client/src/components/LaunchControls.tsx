import {
  faPlay,
  faRocket,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, NumberInput, Popover } from "@mantine/core";
import React from "react";
import useUnitHelper from "../hooks/useUnitHelper";
import { useUnitPreferences } from "../stores/PreferencesStore";

import {
  SimulationStatus,
  useLaunchConditions,
  useSimulationActions,
  useSimulationStatus,
} from "../stores/SimulationStore";
import { MeasurementTypes } from "../utils/units";

export default function LaunchControls() {
  const [showControls, setShowControls] = React.useState(true);
  const simulationStatus = useSimulationStatus();

  const { start, reset } = useSimulationActions();

  return (
    <>
      <Popover opened={showControls} withArrow>
        <Popover.Target>
          <Button
            variant="default"
            color="blue.5"
            size="xs"
            onClick={() => setShowControls((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faRocket} />
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <LaunchControlsDialog />
        </Popover.Dropdown>
      </Popover>
      {simulationStatus === SimulationStatus.NotStarted ? (
        <Button
          variant="default"
          color="blue.5"
          size="xs"
          onClick={() => start()}
        >
          <FontAwesomeIcon color="green" icon={faPlay} />
        </Button>
      ) : (
        <Button variant="default" color="blue.5" size="xs" onClick={reset}>
          <FontAwesomeIcon icon={faRotateLeft} />
        </Button>
      )}
    </>
  );
}

function LaunchControlsDialog() {
  const simulationStatus = useSimulationStatus();
  const launchConditions = useLaunchConditions();
  const unitPreferences = useUnitPreferences();
  const {
    displayToStorageUnit: angleDisplayToStorageUnit,
    storageToDisplayUnit: angleStorageToDisplayUnit,
  } = useUnitHelper(MeasurementTypes.Angle);
  const {
    displayToStorageUnit: speedDisplayToStorageUnit,
    storageToDisplayUnit: speedStorageToDisplayUnit,
  } = useUnitHelper(MeasurementTypes.Speed);
  const { updateLaunchConditions } = useSimulationActions();

  return (
    <Box w={200}>
      <NumberInput
        label={`Ball speed (${unitPreferences.speed})`}
        precision={1}
        disabled={simulationStatus === SimulationStatus.InProgress}
        value={speedStorageToDisplayUnit(launchConditions.speed)}
        onChange={(value) => {
          value &&
            updateLaunchConditions({
              speed: speedDisplayToStorageUnit(value),
            });
        }}
      />
      <NumberInput
        label={`Launch angle (${unitPreferences.angle})`}
        precision={1}
        disabled={simulationStatus === SimulationStatus.InProgress}
        value={angleStorageToDisplayUnit(launchConditions.verticalAngle)}
        onChange={(value) => {
          value &&
            updateLaunchConditions({
              verticalAngle: angleDisplayToStorageUnit(value),
            });
        }}
      />
    </Box>
  );
}

import { Button, TextInput } from "@mantine/core";
import { useState } from "react";
import useUnitHelper from "../hooks/useUnitHelper";
import { useUnitPreferences } from "../stores/PreferencesStore";

import {
  SimulationStatus,
  useLaunchConditions,
  useSimulationActions,
  useSimulationStatus,
} from "../stores/SimulationStore";
import { stylesWithThemedLabelColor } from "../utils/styles";
import { MeasurementTypes } from "../utils/units";

export default function LaunchControls() {
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
  const { start, reset } = useSimulationActions();

  const roundedInitialSpeed = speedStorageToDisplayUnit(
    launchConditions.speed
  ).toFixed(2);
  const roundedInitialVerticalAngle = angleStorageToDisplayUnit(
    launchConditions.verticalAngle
  ).toFixed(2);
  const [speed, setSpeed] = useState(roundedInitialSpeed);
  const [verticalAngle, setVerticalAngle] = useState(
    roundedInitialVerticalAngle
  );

  return (
    <>
      <TextInput
        label={`Ball speed (${unitPreferences.speed})`}
        value={speed}
        onChange={(event) => setSpeed(event.currentTarget.value)}
        sx={(theme) => stylesWithThemedLabelColor(theme)}
      />
      <TextInput
        label={`Launch angle (${unitPreferences.angle})`}
        value={verticalAngle}
        onChange={(event) => setVerticalAngle(event.currentTarget.value)}
        sx={(theme) => stylesWithThemedLabelColor(theme)}
        mb="sm"
      />
      <Button mr="xs" onClick={reset}>
        Reset
      </Button>
      <Button
        color="green"
        onClick={() =>
          start({
            speed: speedDisplayToStorageUnit(parseInt(speed)),
            verticalAngle: angleDisplayToStorageUnit(parseInt(verticalAngle)),
          })
        }
        disabled={simulationStatus !== SimulationStatus.NotStarted}
      >
        Start
      </Button>
    </>
  );
}

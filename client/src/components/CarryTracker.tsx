import { Box, Text } from "@mantine/core";
import React from "react";
import useUnitHelper from "../hooks/useUnitHelper";
import { useBallPosition } from "../stores/SimulationStore";
import { stylesWithThemedBackgroundColor } from "../utils/styles";
import { MeasurementTypes } from "../utils/units";

export default function CarryTracker() {
  const ballPosition = useBallPosition();
  const { storageToDisplayUnit, formatDisplayValue } = useUnitHelper(
    MeasurementTypes.Distance
  );

  return (
    <Box
      p="xs"
      sx={(theme) =>
        stylesWithThemedBackgroundColor(theme, {
          textAlign: "center",
          minWidth: "7rem",
        })
      }
    >
      <Text>{formatDisplayValue(storageToDisplayUnit(ballPosition.x))}</Text>
    </Box>
  );
}

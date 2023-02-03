import React from "react";
import { Box, Text } from "@mantine/core";
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
      p="sm"
      sx={(theme) =>
        stylesWithThemedBackgroundColor(theme, {
          textAlign: "end",
          minWidth: "7rem",
          borderRadius: 4,
        })
      }
    >
      <Text>{formatDisplayValue(storageToDisplayUnit(ballPosition.x))}</Text>
    </Box>
  );
}

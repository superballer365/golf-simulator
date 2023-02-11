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
      display="flex"
      h="36px"
      px="18px"
      sx={(theme) =>
        stylesWithThemedBackgroundColor(theme, {
          alignItems: "center",
          justifyContent: "flex-end",
          minWidth: "7.5rem",
          borderRadius: 4,
        })
      }
    >
      <Text>{formatDisplayValue(storageToDisplayUnit(ballPosition.x))}</Text>
    </Box>
  );
}

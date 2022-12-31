import React from "react";
import { useUnitPreferences } from "../stores/PreferencesStore";
import {
  convertAngle,
  convertDistance,
  convertSpeed,
  MeasurementTypesToStorageUnit,
} from "../utils/units";

export default function useUnitHelper() {
  const unitPreferences = useUnitPreferences();

  const toSpeedDisplayUnit = React.useCallback(
    (val: number) => {
      return convertSpeed(
        val,
        MeasurementTypesToStorageUnit.speed,
        unitPreferences.speedUnit
      );
    },
    [unitPreferences]
  );

  const toSpeedStorageUnit = React.useCallback(
    (val: number) => {
      return convertSpeed(
        val,
        unitPreferences.speedUnit,
        MeasurementTypesToStorageUnit.speed
      );
    },
    [unitPreferences]
  );

  const toAngleDisplayUnit = React.useCallback(
    (val: number) => {
      return convertAngle(
        val,
        MeasurementTypesToStorageUnit.angle,
        unitPreferences.angleUnit
      );
    },
    [unitPreferences]
  );

  const toAngleStorageUnit = React.useCallback(
    (val: number) => {
      return convertAngle(
        val,
        unitPreferences.angleUnit,
        MeasurementTypesToStorageUnit.angle
      );
    },
    [unitPreferences]
  );

  const toDistanceDisplayUnit = React.useCallback(
    (val: number) => {
      return convertDistance(
        val,
        MeasurementTypesToStorageUnit.distance,
        unitPreferences.distanceUnit
      );
    },
    [unitPreferences]
  );

  const toDistanceStorageUnit = React.useCallback(
    (val: number) => {
      return convertDistance(
        val,
        unitPreferences.distanceUnit,
        MeasurementTypesToStorageUnit.distance
      );
    },
    [unitPreferences]
  );

  return {
    toSpeedDisplayUnit,
    toSpeedStorageUnit,
    toAngleDisplayUnit,
    toAngleStorageUnit,
    toDistanceDisplayUnit,
    toDistanceStorageUnit,
  };
}

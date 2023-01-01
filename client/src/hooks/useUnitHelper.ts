import React from "react";
import { useUnitPreferences } from "../stores/PreferencesStore";
import {
  MeasurementTypes,
  MeasurementTypesToConversionFunction,
  MeasurementTypesToStorageUnit,
} from "../utils/units";

export default function useUnitHelper(type: MeasurementTypes) {
  const unitPreferences = useUnitPreferences();

  /**
   * Given a value in storage units, convert it to display units based on the current user preferences.
   */
  const storageToDisplayUnit = React.useCallback(
    (val: number): number => {
      // TODO: figure out how to make this type-safe
      const conversionFunc: any = MeasurementTypesToConversionFunction[type];
      return conversionFunc(
        val,
        MeasurementTypesToStorageUnit[type],
        unitPreferences[type]
      );
    },
    [unitPreferences, type]
  );

  /**
   * Given a value in display units, convert it to storage units.
   */
  const displayToStorageUnit = React.useCallback(
    (val: number): number => {
      // TODO: figure out how to make this type-safe
      const conversionFunc: any = MeasurementTypesToConversionFunction[type];
      return conversionFunc(
        val,
        unitPreferences[type],
        MeasurementTypesToStorageUnit[type]
      );
    },
    [unitPreferences, type]
  );

  /**
   * Given a value in display units, format it with the specified number of decimal places
   * and the unit string.
   */
  const formatDisplayValue = React.useCallback(
    (
      val: number,
      options?: { decimalPlaces?: number; includeUnits?: boolean }
    ) => {
      const opts = { ...DEFAULT_FORMAT_OPTIONS, ...options };
      const unitsSuffix = opts.includeUnits ? ` ${unitPreferences[type]}` : "";
      return val.toFixed(opts.decimalPlaces) + unitsSuffix;
    },
    [unitPreferences, type]
  );

  return {
    storageToDisplayUnit,
    displayToStorageUnit,
    formatDisplayValue,
  };
}

const DEFAULT_FORMAT_OPTIONS = {
  decimalPlaces: 1,
  includeUnits: true,
};

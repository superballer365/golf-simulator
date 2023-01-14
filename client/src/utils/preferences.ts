import { object, mixed, InferType } from "yup";
import {
  MeasurementTypes,
  SpeedUnits,
  AngleUnits,
  DistanceUnits,
} from "./units";

const unitPreferencesSchema = object({
  [MeasurementTypes.Speed]: mixed<SpeedUnits>()
    .oneOf(Object.values(SpeedUnits))
    .required(),
  [MeasurementTypes.Angle]: mixed<AngleUnits>()
    .oneOf(Object.values(AngleUnits))
    .required(),
  [MeasurementTypes.Distance]: mixed<DistanceUnits>()
    .oneOf(Object.values(DistanceUnits))
    .required(),
});

const preferencesSchema = object({
  units: unitPreferencesSchema.required(),
  theme: mixed<ThemeType>().oneOf(["light", "dark"]).required(),
});

export type UnitPreferences = InferType<typeof unitPreferencesSchema>;

export type ThemeType = "light" | "dark";

export type Preferences = InferType<typeof preferencesSchema>;

const defaultPreferences: Preferences = {
  units: {
    [MeasurementTypes.Speed]: SpeedUnits.MilesPerHour,
    [MeasurementTypes.Angle]: AngleUnits.Degrees,
    [MeasurementTypes.Distance]: DistanceUnits.Yards,
  },
  theme: "light",
};

const PREFERENCES_STORAGE_KEY = "userPreferences";

export function getStoredPreferences(): Preferences {
  const preferencesStr = localStorage.getItem(PREFERENCES_STORAGE_KEY);
  if (!preferencesStr) return defaultPreferences;

  try {
    const maybePreferences = JSON.parse(preferencesStr);
    return preferencesSchema.validateSync(maybePreferences);
  } catch (e) {
    console.error(
      "Failed to parse preferences in local storage, using defaults",
      e
    );
    return defaultPreferences;
  }
}

export function updateStoredPreferences(newPreferences: Preferences) {
  localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(newPreferences));
}

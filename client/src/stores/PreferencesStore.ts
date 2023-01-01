import create from "zustand";
import {
  AngleUnits,
  DistanceUnits,
  MeasurementTypes,
  SpeedUnits,
} from "../utils/units";

export interface UnitPreferences {
  [MeasurementTypes.Speed]: SpeedUnits;
  [MeasurementTypes.Angle]: AngleUnits;
  [MeasurementTypes.Distance]: DistanceUnits;
}

type ThemeType = "light" | "dark";

export interface PreferencesState {
  units: UnitPreferences;
  theme: ThemeType;
  actions: {
    updateUnitPreferences: (
      newUnitPreferences: Partial<UnitPreferences>
    ) => void;
    updateTheme: (newTheme: ThemeType) => void;
  };
}

const usePreferencesStore = create<PreferencesState>((set) => ({
  units: {
    [MeasurementTypes.Speed]: SpeedUnits.MilesPerHour,
    [MeasurementTypes.Angle]: AngleUnits.Degrees,
    [MeasurementTypes.Distance]: DistanceUnits.Yards,
  },
  theme: "light",
  actions: {
    updateUnitPreferences: (newUnitPreferences: Partial<UnitPreferences>) =>
      set((state) => ({ units: { ...state.units, ...newUnitPreferences } })),
    updateTheme: (newTheme: ThemeType) => set({ theme: newTheme }),
  },
}));

export const useUnitPreferences = () =>
  usePreferencesStore((state) => state.units);
export const useTheme = () => usePreferencesStore((state) => state.theme);
export const usePreferencesActions = () =>
  usePreferencesStore((state) => state.actions);

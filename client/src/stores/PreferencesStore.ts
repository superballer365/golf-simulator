import create from "zustand";
import { AngleUnits, DistanceUnits, SpeedUnits } from "../utils/units";

export interface UnitPreferences {
  speedUnit: SpeedUnits;
  angleUnit: AngleUnits;
  distanceUnit: DistanceUnits;
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
    speedUnit: SpeedUnits.MilesPerHour,
    angleUnit: AngleUnits.Degrees,
    distanceUnit: DistanceUnits.Yards,
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

import create from "zustand";
import {
  Preferences,
  UnitPreferences,
  ThemeType,
  getStoredPreferences,
  updateStoredPreferences,
} from "../utils/preferences";

export interface PreferencesState extends Preferences {
  actions: {
    updateUnitPreferences: (
      newUnitPreferences: Partial<UnitPreferences>
    ) => void;
    updateTheme: (newTheme: ThemeType) => void;
  };
}

const usePreferencesStore = create<PreferencesState>((set) => ({
  units: getStoredPreferences().units,
  theme: getStoredPreferences().theme,
  actions: {
    updateUnitPreferences: (newUnitPreferences: Partial<UnitPreferences>) =>
      set((state) => {
        const newState: PreferencesState = {
          ...state,
          units: {
            ...state.units,
            ...newUnitPreferences,
          },
        };

        updateStoredPreferences(newState);
        return newState;
      }),
    updateTheme: (newTheme: ThemeType) =>
      set((state) => {
        const newState: PreferencesState = {
          ...state,
          theme: newTheme,
        };

        updateStoredPreferences(newState);
        return newState;
      }),
  },
}));

export const useUnitPreferences = () =>
  usePreferencesStore((state) => state.units);
export const useTheme = () => usePreferencesStore((state) => state.theme);
export const usePreferencesActions = () =>
  usePreferencesStore((state) => state.actions);

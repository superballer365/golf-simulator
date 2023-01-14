import { Container, SegmentedControl, Select } from "@mantine/core";
import useClickOutside from "../hooks/useOutsideClick";
import {
  ThemeType,
  usePreferencesActions,
  useTheme,
  useUnitPreferences,
} from "../stores/PreferencesStore";
import { stylesWithThemedBackgroundColor } from "../utils/styles";
import {
  MeasurementTypes,
  DistanceUnits,
  SpeedUnits,
  AngleUnits,
} from "../utils/units";

interface SettingsDialogProps {
  onClose?: () => void;
}

export default function SettingsDialog({ onClose }: SettingsDialogProps) {
  const theme = useTheme();
  const unitPreferences = useUnitPreferences();

  const { updateUnitPreferences, updateTheme } = usePreferencesActions();

  const register = useClickOutside(() => onClose?.());

  return (
    <Container
      mt="xs"
      p="xs"
      sx={(theme) => stylesWithThemedBackgroundColor(theme)}
      {...register("settingsContainer")}
    >
      <SegmentedControl
        value={theme}
        data={[
          { label: "Light", value: "light" },
          { label: "Dark", value: "dark" },
        ]}
        onChange={(val) => updateTheme(val as ThemeType)}
      />
      <Select
        label="Distance:"
        value={unitPreferences[MeasurementTypes.Distance]}
        onChange={(val) =>
          val &&
          updateUnitPreferences({
            [MeasurementTypes.Distance]: val as DistanceUnits,
          })
        }
        data={Object.values(DistanceUnits)}
        {...register("distanceUnitSelect")}
      />
      <Select
        label="Speed:"
        value={unitPreferences[MeasurementTypes.Speed]}
        onChange={(val) =>
          val &&
          updateUnitPreferences({
            [MeasurementTypes.Speed]: val as SpeedUnits,
          })
        }
        data={Object.values(SpeedUnits)}
        {...register("speedUnitSelect")}
      />
      <Select
        label="Angle:"
        value={unitPreferences[MeasurementTypes.Angle]}
        onChange={(val) =>
          val &&
          updateUnitPreferences({
            [MeasurementTypes.Angle]: val as AngleUnits,
          })
        }
        data={Object.values(AngleUnits)}
        {...register("angleUnitSelect")}
      />
    </Container>
  );
}

import React from "react";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Popover, SegmentedControl, Select } from "@mantine/core";
import {
  usePreferencesActions,
  useTheme,
  useUnitPreferences,
} from "../stores/PreferencesStore";
import { ThemeType } from "../utils/preferences";
import {
  MeasurementTypes,
  DistanceUnits,
  SpeedUnits,
  AngleUnits,
} from "../utils/units";

export default function SettingsControls() {
  const [showSettings, setShowSettings] = React.useState(false);

  return (
    <Popover opened={showSettings} withArrow onChange={setShowSettings}>
      <Popover.Target>
        <ActionIcon
          variant="transparent"
          color="blue.4"
          onClick={() => setShowSettings(!showSettings)}
        >
          <FontAwesomeIcon icon={faGear} />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <SettingsDialog />
      </Popover.Dropdown>
    </Popover>
  );
}

function SettingsDialog() {
  const theme = useTheme();
  const unitPreferences = useUnitPreferences();

  const { updateUnitPreferences, updateTheme } = usePreferencesActions();

  return (
    <>
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
      />
    </>
  );
}

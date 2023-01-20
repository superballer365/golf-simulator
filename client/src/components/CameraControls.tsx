import {
  faBezierCurve,
  faCamera,
  faGolfBall,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Menu } from "@mantine/core";
import React from "react";
import { CameraMode, useCameraActions } from "../stores/CameraStore";

export default function CameraControls() {
  const { setCameraMode } = useCameraActions();

  return (
    <Menu withArrow>
      <Menu.Target>
        <Button variant="default" color="blue.5" size="xs">
          <FontAwesomeIcon icon={faCamera} />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          icon={<FontAwesomeIcon icon={faGolfBall} />}
          onClick={() => setCameraMode(CameraMode.BallCam)}
        >
          Ball Cam
        </Menu.Item>
        <Menu.Item
          icon={<FontAwesomeIcon icon={faBezierCurve} />}
          onClick={() => setCameraMode(CameraMode.SideView)}
        >
          Side View
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

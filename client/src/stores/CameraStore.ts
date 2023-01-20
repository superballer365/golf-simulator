import create from "zustand";

export enum CameraMode {
  BallCam = "Ball Cam",
  SideView = "Side View",
  Indeterminate = "Indeterminate",
}

// This static model of camera state won't work for long, we'll want
// to have some dynamic cameras that follow the ball by updating their
// position and/or target.
interface CameraState {
  position: {
    x: number;
    y: number;
    z: number;
  };
  target: {
    x: number;
    y: number;
    z: number;
  };
}

const modeToCameraState: Record<CameraMode, CameraState | undefined> = {
  [CameraMode.BallCam]: {
    position: {
      x: -10,
      y: 3,
      z: 0,
    },
    target: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  [CameraMode.SideView]: {
    position: {
      x: 0,
      y: 3,
      z: 50,
    },
    target: {
      x: 0,
      y: 10,
      z: 0,
    },
  },
  [CameraMode.Indeterminate]: undefined,
};

interface CameraStoreState {
  mode: CameraMode;
  cameraState?: CameraState;
  actions: {
    setCameraMode: (mode: CameraMode) => void;
  };
}

const useCameraStore = create<CameraStoreState>((set) => ({
  mode: CameraMode.SideView,
  cameraState: modeToCameraState[CameraMode.SideView],
  actions: {
    setCameraMode: (mode: CameraMode) =>
      set({ mode, cameraState: modeToCameraState[mode] }),
  },
}));

export const useCameraMode = () => useCameraStore((state) => state.mode);
export const useCameraState = () =>
  useCameraStore((state) => state.cameraState);
export const useCameraActions = () => useCameraStore((state) => state.actions);

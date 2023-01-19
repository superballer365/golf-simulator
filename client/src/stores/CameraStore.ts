import create from "zustand";

export enum CameraMode {
  BallCam = "Ball Cam",
  SideView = "Side View",
  Indeterminate = "Indeterminate",
}

interface CameraState {
  mode: CameraMode;
  actions: {
    setCameraMode: (mode: CameraMode) => void;
  };
}

const useCameraStore = create<CameraState>((set) => ({
  mode: CameraMode.SideView,
  actions: {
    setCameraMode: (mode: CameraMode) => set({ mode }),
  },
}));

export const useCameraMode = () => useCameraStore((state) => state.mode);
export const useCameraActions = () => useCameraStore((state) => state.actions);

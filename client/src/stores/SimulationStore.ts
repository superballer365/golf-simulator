import create from "zustand";
import * as THREE from "three";
import { xOt, yOt } from "../utils/physics";

export enum SimulationStatus {
  NotStarted,
  InProgress,
  Complete,
}

export interface LaunchConditions {
  /** Initial Speed, in meters per second */
  speed: number;
  /** Launch angle, in radians */
  verticalAngle: number;
}

export interface SimulationState {
  status: SimulationStatus;
  elapsedTime: number; // seconds
  ballPosition: THREE.Vector3;
  launchConditions: LaunchConditions;
  actions: {
    start: () => void;
    complete: () => void;
    reset: () => void;
    updateLaunchConditions: (newConditions: Partial<LaunchConditions>) => void;
    advanceSimulation: (by: number) => void;
  };
}

const useSimulationStore = create<SimulationState>((set) => ({
  status: SimulationStatus.NotStarted,
  elapsedTime: 0,
  ballPosition: new THREE.Vector3(0, 0, 0),
  launchConditions: {
    speed: 20,
    verticalAngle: 0.5236, // 30 degrees
  },
  actions: {
    start: () => set({ status: SimulationStatus.InProgress }),
    complete: () => set({ status: SimulationStatus.Complete }),
    reset: () =>
      set({
        status: SimulationStatus.NotStarted,
        elapsedTime: 0,
        ballPosition: new THREE.Vector3(0, 0, 0),
      }),
    updateLaunchConditions: (newConditions: Partial<LaunchConditions>) =>
      set((state) => {
        if (state.status !== SimulationStatus.NotStarted) return state; // only update launch conditions when simulation has not started
        return {
          launchConditions: { ...state.launchConditions, ...newConditions },
        };
      }),
    advanceSimulation: (by: number) =>
      set((state) => {
        if (state.status !== SimulationStatus.InProgress) return state; // only advance simulation if it's in progress

        const newElapsedTime = state.elapsedTime + by;
        const newXPosition = xOt(
          newElapsedTime,
          0,
          Math.cos(state.launchConditions.verticalAngle) *
            state.launchConditions.speed
        );
        const newYPosition = yOt(
          newElapsedTime,
          0,
          Math.sin(state.launchConditions.verticalAngle) *
            state.launchConditions.speed
        );
        const newPosition = new THREE.Vector3(
          newXPosition,
          newYPosition,
          state.ballPosition.z
        );
        // if the ball crosses the horizontal plane, stop the simulation
        const newStatus =
          newPosition.y <= 0 ? SimulationStatus.Complete : state.status;
        return {
          status: newStatus,
          ballPosition: newPosition,
          elapsedTime: newElapsedTime,
        };
      }),
  },
}));

export const useSimulationStatus = () =>
  useSimulationStore((state) => state.status);
export const useBallPosition = () =>
  useSimulationStore((state) => state.ballPosition);
export const useLaunchConditions = () =>
  useSimulationStore((state) => state.launchConditions);
export const useSimulationActions = () =>
  useSimulationStore((state) => state.actions);

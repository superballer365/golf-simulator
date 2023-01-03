export enum MeasurementTypes {
  Angle = "angle",
  Speed = "speed",
  Distance = "distance",
}

export enum AngleUnits {
  Radians = "radians",
  Degrees = "degrees",
}

export enum SpeedUnits {
  MilesPerHour = "mph",
  MetersPerSecond = "m/s",
}

export enum DistanceUnits {
  Meters = "meters",
  Feet = "feet",
  Yards = "yards",
}

export const MeasurementTypesToConversionFunction = {
  [MeasurementTypes.Angle]: convertAngle,
  [MeasurementTypes.Speed]: convertSpeed,
  [MeasurementTypes.Distance]: convertDistance,
};

export const MeasurementTypesToStorageUnit = {
  [MeasurementTypes.Angle]: AngleUnits.Radians,
  [MeasurementTypes.Speed]: SpeedUnits.MetersPerSecond,
  [MeasurementTypes.Distance]: DistanceUnits.Meters,
};

export function convertAngle(
  value: number,
  inUnit: AngleUnits,
  outUnit: AngleUnits
) {
  const degreesToRadians = (val: number) => (Math.PI * val) / 180;
  const radiansToDegrees = (val: number) => (180 * val) / Math.PI;

  let valInRadians =
    inUnit === AngleUnits.Radians ? value : degreesToRadians(value);

  return outUnit === AngleUnits.Radians
    ? valInRadians
    : radiansToDegrees(valInRadians);
}

export function convertSpeed(
  value: number,
  inUnit: SpeedUnits,
  outUnit: SpeedUnits
) {
  const milesPerHourToMetersPerSecond = (val: number) => val * 0.44704;
  const metersPerSecondToMilesPerHour = (val: number) => val * 2.23694;

  let valInMetersPerSecond =
    inUnit === SpeedUnits.MetersPerSecond
      ? value
      : milesPerHourToMetersPerSecond(value);

  return outUnit === SpeedUnits.MetersPerSecond
    ? valInMetersPerSecond
    : metersPerSecondToMilesPerHour(valInMetersPerSecond);
}

export function convertDistance(
  value: number,
  inUnit: DistanceUnits,
  outUnit: DistanceUnits
) {
  const feetToMeters = (val: number) => val * 0.3048;
  const yardsToMeters = (val: number) => val * 0.9144;
  const metersToFeet = (val: number) => val * 3.28084;
  const metersToYards = (val: number) => val * 1.09361;

  const valInMeters =
    inUnit === DistanceUnits.Feet
      ? feetToMeters(value)
      : inUnit === DistanceUnits.Yards
      ? yardsToMeters(value)
      : value;

  return outUnit === DistanceUnits.Feet
    ? metersToFeet(valInMeters)
    : outUnit === DistanceUnits.Yards
    ? metersToYards(valInMeters)
    : valInMeters;
}

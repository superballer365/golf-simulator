/**
 * @param tSeconds number of seconds since start of simulation
 * @param initialY initial y position
 * @param initialVy initial y velocity
 * @returns the current y position, in meters
 */
export function yOt(tSeconds: number, initialY: number, initialVy: number) {
  const yAccel = -9.82; // gravity, in m/s^2
  return initialY + initialVy * tSeconds + 0.5 * yAccel * Math.pow(tSeconds, 2);
}

/**
 * @param tSeconds number of seconds since start of simulation
 * @param initialX initial x position
 * @param initialVx initial x velocity
 * @returns the current x position, in meters
 */
export function xOt(tSeconds: number, initialX: number, initialVx: number) {
  return initialX + initialVx * tSeconds;
}

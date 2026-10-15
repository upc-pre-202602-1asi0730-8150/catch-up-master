/**
 * @summary Error raised when the allocated size exceeds the available capacity of a CI node.
 * @author Roberto Gonzales Ayala
 */
export class CapacityExceededError extends Error {
  constructor() {
    super('Allocated size exceeds available CI node capacity');
    this.name = 'CapacityExceededError';
  }
}

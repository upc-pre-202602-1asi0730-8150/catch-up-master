/**
 * @summary Utilization status of a CI node, derived from its used-capacity percentage.
 * @author Roberto Gonzales Ayala
 */
export enum UtilizationStatus {
  /** Less than 75 % of the capacity is used. */
  Normal = 'normal',
  /** Between 75 % and 99 % of the capacity is used. */
  Warning = 'warning',
  /** The whole capacity (100 % or more) is used. */
  Critical = 'critical'
}

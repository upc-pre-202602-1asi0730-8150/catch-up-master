/**
 * @summary Resource: CI node as delivered by the platform API.
 * @author Roberto Gonzales Ayala
 */
export interface CiNodeResource {
  id: string;
  name: string;
  location: string;
  maxStorageCapacityGb: number;
}

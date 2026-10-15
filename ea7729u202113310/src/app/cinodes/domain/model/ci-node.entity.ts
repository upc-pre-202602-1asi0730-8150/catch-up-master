/**
 * @summary Domain entity representing a regional CI/CD node.
 * @author Roberto Gonzales Ayala
 */
export class CiNode {
  /**
   * @param id - Unique identifier of the node.
   * @param name - Display name of the node.
   * @param location - Physical location of the node.
   * @param maxStorageCapacityGb - Maximum storage capacity in GB.
   */
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly location: string,
    public readonly maxStorageCapacityGb: number
  ) {}
}

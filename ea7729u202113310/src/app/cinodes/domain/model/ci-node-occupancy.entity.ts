import { CiNode } from './ci-node.entity';
import { RepositoryManifest } from './repository-manifest.entity';
import { UtilizationStatus } from './utilization-status';

/**
 * @summary Aggregate that combines a CI node with its repository manifests and derives storage indicators.
 * @author Roberto Gonzales Ayala
 */
export class CiNodeOccupancy {
  /**
   * @param node - The CI node.
   * @param manifests - Repository manifests registered in the node.
   */
  constructor(
    public readonly node: CiNode,
    public readonly manifests: RepositoryManifest[]
  ) {}

  /** Sum of allocatedSizeGb for all repositories hosted in the node. */
  get totalAllocatedStorageGb(): number {
    return this.manifests.reduce((total, manifest) => total + manifest.allocatedSizeGb, 0);
  }

  /** Maximum capacity minus total allocated storage (never below zero). */
  get availableCapacityGb(): number {
    return Math.max(this.node.maxStorageCapacityGb - this.totalAllocatedStorageGb, 0);
  }

  /** Percentage of capacity currently used. */
  get utilizationPercentage(): number {
    return (this.totalAllocatedStorageGb / this.node.maxStorageCapacityGb) * 100;
  }

  /** Normal (< 75 %), Warning (75 % - 99 %) or Critical (100 %). */
  get utilizationStatus(): UtilizationStatus {
    const percentage = this.utilizationPercentage;
    if (percentage >= 100) return UtilizationStatus.Critical;
    if (percentage >= 75) return UtilizationStatus.Warning;
    return UtilizationStatus.Normal;
  }
}

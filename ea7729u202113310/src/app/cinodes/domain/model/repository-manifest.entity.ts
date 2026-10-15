/**
 * @summary Domain entity representing an open source repository registered in a CI/CD node.
 * @author Roberto Gonzales Ayala
 */
export class RepositoryManifest {
  /**
   * @param id - Unique identifier of the manifest.
   * @param nodeId - Identifier of the CI node hosting the repository.
   * @param topic - Technology topic used to find the repository.
   * @param repositoryId - GitHub repository identifier.
   * @param repositoryName - Short repository name.
   * @param fullName - Full repository name (owner/name).
   * @param stargazersCount - Number of GitHub stars.
   * @param allocatedSizeGb - Storage allocated in the node, in GB.
   * @param registeredAt - ISO date-time string of the registration.
   */
  constructor(
    public readonly id: string,
    public readonly nodeId: string,
    public readonly topic: string,
    public readonly repositoryId: number,
    public readonly repositoryName: string,
    public readonly fullName: string,
    public readonly stargazersCount: number,
    public readonly allocatedSizeGb: number,
    public readonly registeredAt: string
  ) {}
}

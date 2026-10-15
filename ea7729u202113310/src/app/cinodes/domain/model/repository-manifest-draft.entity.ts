/**
 * @summary Domain entity for a repository manifest that has not been saved yet (no id, no registration date).
 * @author Roberto Gonzales Ayala
 */
export class RepositoryManifestDraft {
  /**
   * @param nodeId - Identifier of the target CI node.
   * @param topic - Technology topic.
   * @param repositoryId - GitHub repository identifier.
   * @param repositoryName - Short repository name.
   * @param fullName - Full repository name (owner/name).
   * @param stargazersCount - Number of GitHub stars.
   * @param allocatedSizeGb - Storage to allocate, in GB.
   */
  constructor(
    public readonly nodeId: string,
    public readonly topic: string,
    public readonly repositoryId: number,
    public readonly repositoryName: string,
    public readonly fullName: string,
    public readonly stargazersCount: number,
    public readonly allocatedSizeGb: number
  ) {}
}

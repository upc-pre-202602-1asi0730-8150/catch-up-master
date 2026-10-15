/**
 * @summary Resource: repository manifest as delivered by the platform API.
 * @author Roberto Gonzales Ayala
 */
export interface RepositoryManifestResource {
  id: string;
  nodeId: string;
  topic: string;
  repositoryId: number;
  repositoryName: string;
  fullName: string;
  stargazersCount: number;
  allocatedSizeGb: number;
  registeredAt: string;
}

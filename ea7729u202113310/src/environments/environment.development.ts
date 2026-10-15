/**
 * @summary Development environment configuration: API base URLs and endpoint paths.
 * @author Roberto Gonzales Ayala
 */
export const environment = {
  production: false,
  platformApiBaseUrl: 'http://localhost:3000',
  ciNodesEndpointPath: '/ci-nodes',
  repositoryManifestsEndpointPath: '/repository-manifests',
  githubApiBaseUrl: 'https://api.github.com',
  githubSearchRepositoriesEndpointPath: '/search/repositories'
};

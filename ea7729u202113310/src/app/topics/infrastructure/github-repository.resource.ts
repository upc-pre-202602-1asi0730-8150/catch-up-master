/**
 * @summary Resource: repository item as delivered by the GitHub REST API (snake_case attributes).
 * @author Roberto Gonzales Ayala
 */
export interface GithubRepositoryResource {
  id: number;
  name: string;
  full_name: string;
  stargazers_count: number;
}

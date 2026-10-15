import { GithubRepositoryResource } from './github-repository.resource';

/**
 * @summary Response: payload of the GitHub repository search API.
 * @author Roberto Gonzales Ayala
 */
export interface GithubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubRepositoryResource[];
}

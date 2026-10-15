/**
 * @summary Domain entity representing a public GitHub repository found through the search API.
 * @author Roberto Gonzales Ayala
 */
export class GithubRepository {
  /**
   * @param id - GitHub repository identifier.
   * @param name - Short repository name.
   * @param fullName - Full repository name (owner/name).
   * @param stargazersCount - Number of stars.
   */
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly fullName: string,
    public readonly stargazersCount: number
  ) {}
}

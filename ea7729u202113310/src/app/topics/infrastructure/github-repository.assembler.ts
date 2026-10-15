import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { GithubRepository } from '../domain/model/github-repository.entity';
import { GithubRepositoryResource } from './github-repository.resource';
import { GithubSearchResponse } from './github-search.response';

/**
 * @summary Assembler: maps GitHub snake_case resources to GithubRepository domain entities.
 * @author Roberto Gonzales Ayala
 */
export class GithubRepositoryAssembler
  implements BaseAssembler<GithubRepository, GithubRepositoryResource, GithubSearchResponse>
{
  toEntityFromResource(resource: GithubRepositoryResource): GithubRepository {
    return new GithubRepository(resource.id, resource.name, resource.full_name, resource.stargazers_count);
  }

  toEntitiesFromResponse(response: GithubSearchResponse): GithubRepository[] {
    return response.items.map(item => this.toEntityFromResource(item));
  }
}

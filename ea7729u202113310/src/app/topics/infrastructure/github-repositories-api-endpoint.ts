import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { GithubRepository } from '../domain/model/github-repository.entity';
import { GithubRepositoryAssembler } from './github-repository.assembler';
import { GithubRepositoryResource } from './github-repository.resource';
import { GithubSearchResponse } from './github-search.response';

/**
 * @summary Endpoint: HTTP access to the GitHub repository search API.
 * @author Roberto Gonzales Ayala
 */
export class GithubRepositoriesApiEndpoint extends BaseApiEndpoint<
  GithubRepository,
  GithubRepositoryResource,
  GithubSearchResponse
> {
  private readonly githubAssembler = new GithubRepositoryAssembler();

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.githubApiBaseUrl}${environment.githubSearchRepositoriesEndpointPath}`,
      new GithubRepositoryAssembler()
    );
  }

  /** Searches repositories tagged with the given topic (GitHub qualifier `topic:<name>`). */
  searchByTopic(topic: string): Observable<GithubRepository[]> {
    const params = new HttpParams().set('q', `topic:${topic}`);
    return this.http
      .get<GithubSearchResponse>(this.endpointUrl, { params })
      .pipe(map(response => this.githubAssembler.toEntitiesFromResponse(response)));
  }
}

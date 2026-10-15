import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubRepository } from '../domain/model/github-repository.entity';
import { GithubRepositoriesApiEndpoint } from './github-repositories-api-endpoint';

/**
 * @summary Api facade of the topics bounded context: access to the external GitHub API.
 * @author Roberto Gonzales Ayala
 */
@Injectable({ providedIn: 'root' })
export class TopicsApi {
  private readonly repositoriesEndpoint = new GithubRepositoriesApiEndpoint(inject(HttpClient));

  /** Gets the public repositories found for a topic. */
  searchRepositoriesByTopic(topic: string): Observable<GithubRepository[]> {
    return this.repositoriesEndpoint.searchByTopic(topic);
  }
}

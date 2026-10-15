import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { RepositoryManifest } from '../domain/model/repository-manifest.entity';
import { RepositoryManifestDraft } from '../domain/model/repository-manifest-draft.entity';
import { RepositoryManifestAssembler } from './repository-manifest.assembler';
import { RepositoryManifestResource } from './repository-manifest.resource';
import { RepositoryManifestsResponse } from './repository-manifests.response';

/**
 * @summary Endpoint: HTTP access to the repository-manifests collection of the platform API.
 * @author Roberto Gonzales Ayala
 */
export class RepositoryManifestsApiEndpoint extends BaseApiEndpoint<
  RepositoryManifest,
  RepositoryManifestResource,
  RepositoryManifestsResponse
> {
  private readonly manifestAssembler = new RepositoryManifestAssembler();

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformApiBaseUrl}${environment.repositoryManifestsEndpointPath}`,
      new RepositoryManifestAssembler()
    );
  }

  /** Creates a repository manifest from a draft and returns the persisted entity. */
  create(draft: RepositoryManifestDraft): Observable<RepositoryManifest> {
    return this.http
      .post<RepositoryManifestResource>(this.endpointUrl, this.manifestAssembler.toRequestFromDraft(draft))
      .pipe(map(resource => this.manifestAssembler.toEntityFromResource(resource)));
  }
}

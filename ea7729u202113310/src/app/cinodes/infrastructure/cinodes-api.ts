import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CiNode } from '../domain/model/ci-node.entity';
import { RepositoryManifest } from '../domain/model/repository-manifest.entity';
import { RepositoryManifestDraft } from '../domain/model/repository-manifest-draft.entity';
import { CiNodesApiEndpoint } from './ci-nodes-api-endpoint';
import { RepositoryManifestsApiEndpoint } from './repository-manifests-api-endpoint';

/**
 * @summary Api facade of the cinodes bounded context: single entry point to its remote endpoints.
 * @author Roberto Gonzales Ayala
 */
@Injectable({ providedIn: 'root' })
export class CiNodesApi {
  private readonly ciNodesEndpoint = new CiNodesApiEndpoint(inject(HttpClient));
  private readonly manifestsEndpoint = new RepositoryManifestsApiEndpoint(inject(HttpClient));

  /** Gets all CI nodes. */
  getCiNodes(): Observable<CiNode[]> {
    return this.ciNodesEndpoint.getAll();
  }

  /** Gets all repository manifests. */
  getRepositoryManifests(): Observable<RepositoryManifest[]> {
    return this.manifestsEndpoint.getAll();
  }

  /** Creates a repository manifest. */
  createRepositoryManifest(draft: RepositoryManifestDraft): Observable<RepositoryManifest> {
    return this.manifestsEndpoint.create(draft);
  }
}

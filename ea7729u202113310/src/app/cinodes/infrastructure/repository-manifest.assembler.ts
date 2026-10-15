import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { RepositoryManifest } from '../domain/model/repository-manifest.entity';
import { RepositoryManifestDraft } from '../domain/model/repository-manifest-draft.entity';
import { CreateRepositoryManifestRequest } from './create-repository-manifest.request';
import { RepositoryManifestResource } from './repository-manifest.resource';
import { RepositoryManifestsResponse } from './repository-manifests.response';

/**
 * @summary Assembler: maps repository manifest resources/responses to entities and drafts to requests.
 * @author Roberto Gonzales Ayala
 */
export class RepositoryManifestAssembler
  implements BaseAssembler<RepositoryManifest, RepositoryManifestResource, RepositoryManifestsResponse>
{
  toEntityFromResource(resource: RepositoryManifestResource): RepositoryManifest {
    return new RepositoryManifest(
      resource.id,
      resource.nodeId,
      resource.topic,
      resource.repositoryId,
      resource.repositoryName,
      resource.fullName,
      resource.stargazersCount,
      resource.allocatedSizeGb,
      resource.registeredAt
    );
  }

  toEntitiesFromResponse(response: RepositoryManifestsResponse): RepositoryManifest[] {
    return response.map(resource => this.toEntityFromResource(resource));
  }

  /** Builds the creation request; registeredAt is populated with the current date-time (ISO string). */
  toRequestFromDraft(draft: RepositoryManifestDraft): CreateRepositoryManifestRequest {
    return {
      nodeId: draft.nodeId,
      topic: draft.topic,
      repositoryId: draft.repositoryId,
      repositoryName: draft.repositoryName,
      fullName: draft.fullName,
      stargazersCount: draft.stargazersCount,
      allocatedSizeGb: draft.allocatedSizeGb,
      registeredAt: new Date().toISOString()
    };
  }
}

import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { CiNode } from '../domain/model/ci-node.entity';
import { CiNodeResource } from './ci-node.resource';
import { CiNodesResponse } from './ci-nodes.response';

/**
 * @summary Assembler: maps CI node resources and responses to CiNode entities.
 * @author Roberto Gonzales Ayala
 */
export class CiNodeAssembler implements BaseAssembler<CiNode, CiNodeResource, CiNodesResponse> {
  toEntityFromResource(resource: CiNodeResource): CiNode {
    return new CiNode(resource.id, resource.name, resource.location, resource.maxStorageCapacityGb);
  }

  toEntitiesFromResponse(response: CiNodesResponse): CiNode[] {
    return response.map(resource => this.toEntityFromResource(resource));
  }
}

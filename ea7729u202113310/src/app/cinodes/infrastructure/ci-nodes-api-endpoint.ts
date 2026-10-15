import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { CiNode } from '../domain/model/ci-node.entity';
import { CiNodeAssembler } from './ci-node.assembler';
import { CiNodeResource } from './ci-node.resource';
import { CiNodesResponse } from './ci-nodes.response';

/**
 * @summary Endpoint: HTTP access to the ci-nodes collection of the platform API.
 * @author Roberto Gonzales Ayala
 */
export class CiNodesApiEndpoint extends BaseApiEndpoint<CiNode, CiNodeResource, CiNodesResponse> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformApiBaseUrl}${environment.ciNodesEndpointPath}`,
      new CiNodeAssembler()
    );
  }
}

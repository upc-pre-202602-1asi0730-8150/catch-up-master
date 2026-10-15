import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BaseAssembler } from './base-assembler';

/**
 * @summary Base class for API endpoints: performs HTTP calls and delegates mapping to an assembler.
 * @author Roberto Gonzales Ayala
 * @typeParam TEntity - Domain entity type.
 * @typeParam TResource - API resource type.
 * @typeParam TResponse - API response type.
 */
export abstract class BaseApiEndpoint<TEntity, TResource, TResponse> {
  /**
   * @param http - Angular HttpClient.
   * @param endpointUrl - Absolute URL of the endpoint.
   * @param assembler - Assembler used to map responses to entities.
   */
  protected constructor(
    protected readonly http: HttpClient,
    protected readonly endpointUrl: string,
    protected readonly assembler: BaseAssembler<TEntity, TResource, TResponse>
  ) {}

  /** Retrieves the collection exposed by the endpoint as domain entities. */
  getAll(): Observable<TEntity[]> {
    return this.http
      .get<TResponse>(this.endpointUrl)
      .pipe(map(response => this.assembler.toEntitiesFromResponse(response)));
  }
}

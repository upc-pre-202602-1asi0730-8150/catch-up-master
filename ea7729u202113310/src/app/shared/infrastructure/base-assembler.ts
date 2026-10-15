/**
 * @summary Contract for assemblers: map API resources/responses to domain entities.
 * @author Roberto Gonzales Ayala
 * @typeParam TEntity - Domain entity type.
 * @typeParam TResource - API resource type (single item as delivered by the API).
 * @typeParam TResponse - API response type (full payload as delivered by the API).
 */
export interface BaseAssembler<TEntity, TResource, TResponse> {
  /** Maps a single resource to a domain entity. */
  toEntityFromResource(resource: TResource): TEntity;

  /** Maps a complete response to a list of domain entities. */
  toEntitiesFromResponse(response: TResponse): TEntity[];
}

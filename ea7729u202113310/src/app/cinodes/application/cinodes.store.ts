import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, forkJoin, switchMap, tap, throwError } from 'rxjs';
import { CapacityExceededError } from '../domain/model/capacity-exceeded.error';
import { CiNode } from '../domain/model/ci-node.entity';
import { CiNodeOccupancy } from '../domain/model/ci-node-occupancy.entity';
import { RepositoryManifest } from '../domain/model/repository-manifest.entity';
import { RepositoryManifestDraft } from '../domain/model/repository-manifest-draft.entity';
import { CiNodesApi } from '../infrastructure/cinodes-api';

/**
 * @summary Store (Angular Signals) with the state of the cinodes bounded context.
 * @author Roberto Gonzales Ayala
 */
@Injectable({ providedIn: 'root' })
export class CiNodesStore {
  private readonly api = inject(CiNodesApi);

  private readonly ciNodesState = signal<CiNode[]>([]);
  private readonly manifestsState = signal<RepositoryManifest[]>([]);
  private readonly loadingState = signal(false);
  private readonly errorState = signal(false);

  /** CI nodes currently loaded. */
  readonly ciNodes = this.ciNodesState.asReadonly();
  /** True while data is being loaded. */
  readonly loading = this.loadingState.asReadonly();
  /** True when the last load failed. */
  readonly error = this.errorState.asReadonly();

  /** Every node with its manifests and derived storage indicators. */
  readonly occupancies = computed(() =>
    this.ciNodesState().map(
      node => new CiNodeOccupancy(node, this.manifestsState().filter(manifest => manifest.nodeId === node.id))
    )
  );

  /** Loads CI nodes and repository manifests in parallel. */
  loadAll(): void {
    this.loadingState.set(true);
    this.errorState.set(false);
    forkJoin({ nodes: this.api.getCiNodes(), manifests: this.api.getRepositoryManifests() }).subscribe({
      next: ({ nodes, manifests }) => {
        this.ciNodesState.set(nodes);
        this.manifestsState.set(manifests);
        this.loadingState.set(false);
      },
      error: () => {
        this.errorState.set(true);
        this.loadingState.set(false);
      }
    });
  }

  /** Available capacity (GB) of a node at this moment; 0 when the node is unknown. */
  availableCapacityOf(nodeId: string): number {
    return this.occupancies().find(occupancy => occupancy.node.id === nodeId)?.availableCapacityGb ?? 0;
  }

  /**
   * Creates a manifest. Manifests are re-fetched first so the capacity check uses fresh data.
   * @throws CapacityExceededError (through the observable) when the node cannot host the allocation.
   */
  createManifest(draft: RepositoryManifestDraft): Observable<RepositoryManifest> {
    return this.api.getRepositoryManifests().pipe(
      tap(manifests => this.manifestsState.set(manifests)),
      switchMap(() =>
        draft.allocatedSizeGb > this.availableCapacityOf(draft.nodeId)
          ? throwError(() => new CapacityExceededError())
          : this.api.createRepositoryManifest(draft)
      ),
      tap(created => this.manifestsState.update(list => [...list, created]))
    );
  }
}

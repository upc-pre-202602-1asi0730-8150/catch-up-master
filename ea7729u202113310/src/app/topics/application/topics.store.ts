import { Injectable, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { GithubRepository } from '../domain/model/github-repository.entity';
import { TopicsApi } from '../infrastructure/topics-api';

/**
 * @summary Store (Angular Signals) with the repositories found on GitHub for the selected topic.
 * @author Roberto Gonzales Ayala
 */
@Injectable({ providedIn: 'root' })
export class TopicsStore {
  private readonly api = inject(TopicsApi);
  private readonly repositoriesState = signal<GithubRepository[]>([]);
  private readonly loadingState = signal(false);
  private readonly errorState = signal(false);
  private pendingRequest?: Subscription;

  /** Repositories found for the last requested topic. */
  readonly repositories = this.repositoriesState.asReadonly();
  /** True while repositories are being fetched. */
  readonly loading = this.loadingState.asReadonly();
  /** True when the last request failed (network error, rate limit, ...). */
  readonly error = this.errorState.asReadonly();

  /** Loads repositories for a topic, cancelling any request still in flight. */
  loadRepositories(topic: string): void {
    this.pendingRequest?.unsubscribe();
    this.repositoriesState.set([]);
    this.loadingState.set(true);
    this.errorState.set(false);
    this.pendingRequest = this.api.searchRepositoriesByTopic(topic).subscribe({
      next: repositories => {
        this.repositoriesState.set(repositories);
        this.loadingState.set(false);
      },
      error: () => {
        this.errorState.set(true);
        this.loadingState.set(false);
      }
    });
  }

  /** Clears the current results. */
  reset(): void {
    this.pendingRequest?.unsubscribe();
    this.repositoriesState.set([]);
    this.loadingState.set(false);
    this.errorState.set(false);
  }
}

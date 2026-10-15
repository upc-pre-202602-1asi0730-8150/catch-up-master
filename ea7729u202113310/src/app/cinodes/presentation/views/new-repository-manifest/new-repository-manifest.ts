import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslatePipe } from '@ngx-translate/core';
import { startWith } from 'rxjs';
import { TopicsStore } from '../../../../topics/application/topics.store';
import { SUPPORTED_TOPICS } from '../../../../topics/domain/model/topic';
import { CiNodesStore } from '../../../application/cinodes.store';
import { RepositoryManifestDraft } from '../../../domain/model/repository-manifest-draft.entity';

/**
 * @summary View with the reactive form to register a repository manifest in a regional CI/CD node.
 * Includes cross-field validation: the allocated size must be > 0 and <= the available capacity of the selected node.
 * @author Roberto Gonzales Ayala
 */
@Component({
  selector: 'app-new-repository-manifest',
  imports: [
    ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule,
    MatButtonModule, MatProgressSpinnerModule, TranslatePipe
  ],
  templateUrl: './new-repository-manifest.html',
  styleUrl: './new-repository-manifest.css'
})
export class NewRepositoryManifest implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly ciNodesStore = inject(CiNodesStore);
  protected readonly topicsStore = inject(TopicsStore);

  /** Topics offered in the form. */
  protected readonly topics = SUPPORTED_TOPICS;

  /** True while the manifest is being saved. */
  protected readonly saving = signal(false);
  /** True when saving failed for a reason other than capacity. */
  protected readonly saveFailed = signal(false);

  /** Validator: the value must be greater than zero. */
  private readonly positiveSize: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === null || value === '') return null;
    return Number(value) > 0 ? null : { notPositive: true };
  };

  /** Cross validator: the value must not exceed the available capacity of the selected node right now. */
  private readonly withinNodeCapacity: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const nodeId: string | null = control.parent?.get('nodeId')?.value ?? null;
    const value = control.value;
    if (!nodeId || value === null || value === '') return null;
    const available = this.ciNodesStore.availableCapacityOf(nodeId);
    return Number(value) > available ? { exceedsCapacity: { available } } : null;
  };

  protected readonly form = this.formBuilder.group({
    topic: this.formBuilder.control<string | null>(null, Validators.required),
    repositoryId: this.formBuilder.control<number | null>({ value: null, disabled: true }, Validators.required),
    nodeId: this.formBuilder.control<string | null>(null, Validators.required),
    allocatedSizeGb: this.formBuilder.control<number | null>(null, [
      Validators.required, this.positiveSize, this.withinNodeCapacity
    ])
  });

  /** Reactive value of the selected node, used to show its available capacity. */
  private readonly selectedNodeId = toSignal(
    this.form.controls.nodeId.valueChanges.pipe(startWith(this.form.controls.nodeId.value)),
    { initialValue: null }
  );

  /** Available capacity (GB) of the selected node, or null when no node is selected. */
  protected readonly selectedNodeAvailableGb = computed(() => {
    const nodeId = this.selectedNodeId();
    return nodeId ? this.ciNodesStore.availableCapacityOf(nodeId) : null;
  });

  ngOnInit(): void {
    this.topicsStore.reset();
    this.ciNodesStore.loadAll();

    // Selecting a topic queries GitHub in real time and resets the repository choice.
    this.form.controls.topic.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(topic => {
      const repositoryControl = this.form.controls.repositoryId;
      repositoryControl.reset(null);
      if (topic) {
        repositoryControl.enable();
        this.topicsStore.loadRepositories(topic);
      } else {
        repositoryControl.disable();
        this.topicsStore.reset();
      }
    });

    // Changing the node (or the data it depends on) re-evaluates the capacity rule.
    this.form.controls.nodeId.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.form.controls.allocatedSizeGb.updateValueAndValidity());
  }

  /** Saves the manifest and returns to Home. */
  protected onSubmit(): void {
    if (this.form.invalid || this.saving()) return;
    const { topic, repositoryId, nodeId, allocatedSizeGb } = this.form.getRawValue();
    const repository = this.topicsStore.repositories().find(item => item.id === repositoryId);
    if (!topic || !repository || !nodeId || allocatedSizeGb === null) return;

    const draft = new RepositoryManifestDraft(
      nodeId, topic, repository.id, repository.name, repository.fullName,
      repository.stargazersCount, Number(allocatedSizeGb)
    );

    this.saving.set(true);
    this.saveFailed.set(false);
    this.ciNodesStore.createManifest(draft).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => {
        this.saving.set(false);
        // Capacity may have changed on the server: re-evaluate the rule; otherwise report a generic failure.
        this.form.controls.allocatedSizeGb.updateValueAndValidity();
        if (!this.form.controls.allocatedSizeGb.hasError('exceedsCapacity')) this.saveFailed.set(true);
        this.form.controls.allocatedSizeGb.markAsTouched();
      }
    });
  }

  /** Discards the form and returns to Home. */
  protected onCancel(): void {
    this.router.navigate(['/home']);
  }
}

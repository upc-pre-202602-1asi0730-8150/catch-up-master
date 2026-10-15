import { Component, inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { CiNodesStore } from '../../../application/cinodes.store';
import { CiNodeSummary } from '../ci-node-summary/ci-node-summary';

/**
 * @summary "My CI Nodes" section: grid list with two CI Node Summary cards per row (one on small screens).
 * @author Roberto Gonzales Ayala
 */
@Component({
  selector: 'app-my-ci-nodes',
  imports: [MatGridListModule, MatProgressSpinnerModule, MatButtonModule, TranslatePipe, CiNodeSummary],
  templateUrl: './my-ci-nodes.html',
  styleUrl: './my-ci-nodes.css'
})
export class MyCiNodes {
  protected readonly store = inject(CiNodesStore);

  /** Two columns, or one on small screens. */
  protected readonly columns = toSignal(
    inject(BreakpointObserver).observe('(max-width: 900px)').pipe(map(state => (state.matches ? 1 : 2))),
    { initialValue: 2 }
  );
}

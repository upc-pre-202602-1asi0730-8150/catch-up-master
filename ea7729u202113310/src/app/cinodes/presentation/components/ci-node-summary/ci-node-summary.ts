import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { CiNodeOccupancy } from '../../../domain/model/ci-node-occupancy.entity';
import { UtilizationStatus } from '../../../domain/model/utilization-status';

/**
 * @summary Card summarizing one CI node: header (name, location), repositories and storage indicators.
 * @author Roberto Gonzales Ayala
 */
@Component({
  selector: 'app-ci-node-summary',
  imports: [MatCardModule, MatIconModule, TranslatePipe],
  templateUrl: './ci-node-summary.html',
  styleUrl: './ci-node-summary.css'
})
export class CiNodeSummary {
  /** Node with its manifests and derived indicators. */
  readonly occupancy = input.required<CiNodeOccupancy>();

  /** Icon that complements the status color so the status is not conveyed by color alone. */
  protected statusIcon(status: UtilizationStatus): string {
    switch (status) {
      case UtilizationStatus.Critical: return 'error';
      case UtilizationStatus.Warning: return 'warning';
      default: return 'check_circle';
    }
  }
}

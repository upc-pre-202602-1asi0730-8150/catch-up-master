import { Component, OnInit, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CiNodesStore } from '../../../../cinodes/application/cinodes.store';
import { MyCiNodes } from '../../../../cinodes/presentation/components/my-ci-nodes/my-ci-nodes';

/**
 * @summary Home view: title, description and the "My CI Nodes" section.
 * @author Roberto Gonzales Ayala
 */
@Component({
  selector: 'app-home',
  imports: [TranslatePipe, MyCiNodes],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private readonly store = inject(CiNodesStore);

  ngOnInit(): void {
    this.store.loadAll();
  }
}

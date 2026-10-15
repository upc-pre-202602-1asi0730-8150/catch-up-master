import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * @summary View shown for unsupported routes: reports the missing route and offers a way back to Home.
 * @author Roberto Gonzales Ayala
 */
@Component({
  selector: 'app-page-not-found',
  imports: [RouterLink, MatButtonModule, MatIconModule, TranslatePipe],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css'
})
export class PageNotFound {
  /** The route that could not be found. */
  protected readonly path = inject(Router).url;
}

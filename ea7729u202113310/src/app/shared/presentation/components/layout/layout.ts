import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

/**
 * @summary Main layout: toolbar (logo, title, language switcher), side navigation and routed content.
 * @author Roberto Gonzales Ayala
 */
@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive,
    MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule,
    TranslatePipe, LanguageSwitcher
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  /** Whether the side navigation is open. */
  protected readonly sidenavOpened = signal(true);

  /** Navigation options; labels are translation keys. */
  protected readonly navItems = [
    { label: 'nav.home', path: '/home', icon: 'home' },
    { label: 'nav.new-repository-manifest', path: '/repositories/manifests/new', icon: 'add_circle' }
  ];

  /** Opens or closes the side navigation. */
  protected toggleSidenav(): void {
    this.sidenavOpened.update(opened => !opened);
  }
}

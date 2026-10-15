import { Component, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

/**
 * @summary Toggle group to switch the interface language between English (EN) and Spanish (ES).
 * @author Roberto Gonzales Ayala
 */
@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleModule, TranslatePipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css'
})
export class LanguageSwitcher {
  protected readonly translate = inject(TranslateService);

  /** Languages offered to the user. */
  protected readonly languages = [
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' }
  ];

  /** Changes the active language. */
  protected selectLanguage(code: string): void {
    this.translate.use(code);
  }
}

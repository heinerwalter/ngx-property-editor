import { Component, Input } from '@angular/core';
import { IconBaseComponent } from '../icon-base.component';
import * as languages from '@cospired/i18n-iso-languages';

@Component({
  selector: 'pe-language-icon',
  template: LanguageIconComponent.iconComponentTemplate,
  styleUrls: ['../icon.component.scss'],
})
export class LanguageIconComponent extends IconBaseComponent {

  /** ISO 639 language code (two character string). */
  @Input() public language: string | undefined = undefined;

  /** Returns the human-readable name of the `language` code. */
  protected get languageName(): string | undefined {
    if (!this.language) return undefined;
    return languages.getName(this.language, navigator.language);
  }

  /**
   * The component template is using the flag-like svg images from package language-icons.
   * See https://www.npmjs.com/package/language-icons
   */
  protected static readonly iconComponentTemplate: string =
    IconBaseComponent.generateIconComponentTemplate(
      `<img *ngIf="language" class="language-flag" alt="{{ languageName || '' }}" src="https://unpkg.com/language-icons/icons/{{ language }}.svg" />`);

}

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IconBaseComponent } from '../icon-base.component';
import * as languages from '@cospired/i18n-iso-languages';

@Component({
  selector: 'pe-language-icon',
  template: IconBaseComponent.generateIconComponentTemplate(
    `<img *ngIf="language"
    class="language-flag"
    style="height: 2em;"
    alt="{{ languageName || '' }}"
    src="https://unpkg.com/language-icons/icons/{{ language.toLowerCase() }}.svg" />`),
  styleUrls: ['../icon.component.scss'],
})
export class LanguageIconComponent extends IconBaseComponent implements OnChanges {

  /** ISO 639 language code (two character string). */
  @Input() public languageCode: string | undefined = undefined;

  /** The human-readable name of the `language` code. Wird von `ngOnChanges()` bestimmt. */
  protected languageName: string | undefined = undefined;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('language')) {
      if (!this.languageCode)
        this.languageName = undefined;
      else
        this.languageName = languages.getName(this.languageCode, navigator.language);
    }
  }

}

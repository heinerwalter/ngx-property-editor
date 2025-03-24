import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IconBaseComponent } from '../icon-base.component';
import * as languages from '@cospired/i18n-iso-languages';

@Component({
  selector: 'pe-language-icon',
  template: IconBaseComponent.generateIconComponentTemplate(
    `<img *ngIf="languageCode"
    class="language-flag"
    style="height: 2em;{{ circle ? ' border-radius: 50%;' : ''}}"
    alt="{{ languageName || '' }}"
    src="https://unpkg.com/language-icons/icons/{{ languageCode.toLowerCase() }}.svg" />`),
  styleUrls: ['../icon.component.scss'],
})
export class LanguageIconComponent extends IconBaseComponent implements OnChanges {

  /** ISO 639 language code (two character string). */
  @Input() public languageCode: string | undefined = undefined;
  
  /** If true, the language icon is displayed as circle. */
  @Input() public circle: boolean = true;

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

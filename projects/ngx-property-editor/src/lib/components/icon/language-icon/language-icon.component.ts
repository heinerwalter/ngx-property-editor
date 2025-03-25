import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IconBaseComponent } from '../icon-base.component';
import * as languages from '@cospired/i18n-iso-languages';
import { languageIconsSvg } from './language-icons-svg';

@Component({
  selector: 'pe-language-icon',
  template: IconBaseComponent.generateIconComponentTemplate(
    `<img *ngIf="languageCode"
    class="language-flag"
    style="height: 2em;{{ circle ? ' border-radius: 50%;' : ''}}"
    [alt]="languageName || ''"
    src="{{ languageIconSrc }}" />`),
  styleUrls: ['../icon.component.scss'],
})
export class LanguageIconComponent extends IconBaseComponent implements OnChanges {

  /** ISO 639 language code (two character string). */
  @Input() public languageCode: string | undefined = undefined;

  /** If true, the language icon is displayed as circle. */
  @Input() public circle: boolean = true;

  /** The human-readable name of the `language` code. Wird von `ngOnChanges()` bestimmt. */
  protected languageName: string | undefined = undefined;

  /**
   * The language icon SVG code as base64 encoded data URL.
   *
   * Alternatively this property can be set to a URL like
   * `https://unpkg.com/language-icons/icons/${ languageCode.toLowerCase() }.svg`
   * for accessing the language icons from the published npm package.
   * But they are outdated (many icons missing).
   */
  protected languageIconSrc: string = '';

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('languageCode')) {
      if (!this.languageCode) {
        this.languageName = undefined;
        this.languageIconSrc = '';
      } else {
        this.languageName = languages.getName(this.languageCode, navigator.language);

        let data: string = languageIconsSvg[this.languageCode.toLowerCase()];
        if (data) data = btoa(data);
        if (data) data = 'data:image/svg+xml;base64,' + data;
        this.languageIconSrc = data || '';
      }
    }
  }

}

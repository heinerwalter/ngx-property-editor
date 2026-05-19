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
    [ngbTooltip]="showLanguageName ? '' : languageName || ''"
    src="{{ languageIconSrc }}" />
    <span *ngIf="showLanguageName && languageName"
          style="font-style: normal; padding-left: 0.5em;">
      {{ languageName }}
    </span>`),
  styleUrls: ['../icon.component.scss'],
})
export class LanguageIconComponent extends IconBaseComponent implements OnChanges {

  /** An ISO 639 language code (two character string). */
  @Input() public languageCode: string | undefined = undefined;

  /** If true, the language icon is displayed as a circle. */
  @Input() public circle: boolean = true;

  /**
   * If true, the language name is displayed after the icon.
   * If false, the language name is displayed as a tooltip on the icon.
   */
  @Input() public showLanguageName: boolean = false;

  /** The human-readable name of the language code. Is filled by `ngOnChanges()`. */
  protected languageName: string | undefined = undefined;

  /**
   * The language icon SVG code as base64 encoded data URL.
   *
   * Alternatively, this property can be set to a URL like
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
        let lang: string = navigator.language;
        lang = lang?.split('-')[0];

        this.languageName = languages.getName(this.languageCode, lang);

        let data: string = languageIconsSvg[this.languageCode.toLowerCase()];
        if (data) data = btoa(data);
        if (data) data = 'data:image/svg+xml;base64,' + data;
        this.languageIconSrc = data || '';
      }
    }
  }

}

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Stringifier } from '../../../controller/stringifier';
import { IconBaseComponent } from '../icon-base.component';
import * as countries from "i18n-iso-countries";

@Component({
  selector: 'pe-country-icon',
  template: IconBaseComponent.generateIconComponentTemplate(
    `<span *ngIf="emoji"
           class="country-flag"
           style="width: 1em;"
           [ngbTooltip]="showCountryName ? '' : countryName || ''">
       {{ emoji }}
     </span>
     <span *ngIf="showCountryName && countryName"
          style="font-style: normal; padding-left: 0.25em;">
      {{ countryName }}
    </span>`),
  styleUrls: ['../icon.component.scss'],
})
export class CountryIconComponent extends IconBaseComponent implements OnChanges {

  /** An ISO 3166 country code (two character string). */
  @Input() public countryCode: string | undefined = undefined;

  /**
   * If true, the country name is displayed after the icon.
   * If false, the country name is displayed as a tooltip on the icon.
   */
  @Input() public showCountryName: boolean = false;

  /** Flag emoji string generated from the country code. */
  protected emoji: string | undefined;

  /** The human-readable name of the country code. Is filled by `ngOnChanges()`. */
  protected countryName: string | undefined = undefined;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('countryCode')) {
      this.updateIcon();
    }
  }

  /**
   * Generates the flag emoji string from the country code.
   */
  private updateIcon(): void {
    if (!this.countryCode) {
      this.emoji = undefined;
      this.countryName = undefined;
      return;
    }
    this.emoji = Stringifier.countryCodeToFlagEmoji(this.countryCode);

    let lang: string = navigator.language;
    lang = lang?.split('-')[0];

    this.countryName = countries.getName(this.countryCode, lang);
  }
}

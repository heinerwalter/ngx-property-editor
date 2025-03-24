import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Stringifier } from '../../../controller/stringifier';
import { IconBaseComponent } from '../icon-base.component';

@Component({
  selector: 'pe-country-icon',
  template: IconBaseComponent.generateIconComponentTemplate(
    '<span *ngIf="emoji" class="country-flag">{{ emoji }}</span>'),
  styleUrls: ['../icon.component.scss'],
})
export class CountryIconComponent extends IconBaseComponent implements OnChanges {

  /** An ISO 3166 country code (two character string). */
  @Input() public countryCode: string | undefined = undefined;

  /** Flag emoji string generated from the country code. */
  protected emoji: string | undefined;

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
      return;
    }
    this.emoji = Stringifier.countryCodeToFlagEmoji(this.countryCode);
  }
}

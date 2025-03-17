import { Component, Input, OnInit } from '@angular/core';
import { SelectInputBase } from '../../input-base';
import * as countries from 'i18n-iso-countries';

@Component({
  selector: 'pe-country-select-input',
  templateUrl: './country-select-input.component.html',
  styleUrls: ['./country-select-input.component.scss'],
})
export class CountrySelectInputComponent extends SelectInputBase<string> implements OnInit {

  /**
   * Optional: Add this class to the select element.
   */
  @Input() public selectClass: string | undefined = undefined;

  /**
   * An array from which the user can select one or multiple items.
   */
  protected dataSource: { countryCode: string, name: string }[] = [];

  public constructor() {
    super();
  }

  public ngOnInit(): void {
    CountrySelectInputComponent.initializeDataSource();
    this.dataSource = CountrySelectInputComponent.staticDataSource;
  }

  // region Static data source (generates only once)

  /**
   * Returns the human-readable name of the country with the given country code.
   * Returns undefined, if the given country code is invalid.
   * @param countryCode ISO 3166 country code (two character string).
   * @returns Human-readable country name.
   */
  public static getCountryName(countryCode: string): string | undefined {
    if (!countryCode) return undefined;
    return countries.getName(countryCode, navigator.language);
  }

  /** Static data source containing all country codes and localized names. */
  private static staticDataSource: { countryCode: string, name: string }[] = [];

  /**
   * Generates the `staticDataSource` of all country codes and localized names.
   */
  private static initializeDataSource(): void {
    if (this.staticDataSource.length)
      return;

    this.staticDataSource = [];

    // Build data source from all country codes
    const countriesDictionary: { [alpha2Key: string]: string } =
      countries.getNames(navigator.language, { select: 'official' });
    for (let countryCode in countriesDictionary) {
      if (!countriesDictionary.hasOwnProperty(countryCode)) continue;
      this.staticDataSource.push({
        countryCode: countryCode.toLowerCase(),
        name: countriesDictionary[countryCode],
      });
    }
  }

  // endregion

}

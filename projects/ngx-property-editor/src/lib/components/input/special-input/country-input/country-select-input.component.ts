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
    if (!CountrySelectInputComponent.staticDataSource.length)
      CountrySelectInputComponent.initializeDataSource();
    this.dataSource = CountrySelectInputComponent.staticDataSource;
  }

  // region Static data source (generates only once)

  /** Static data source containing all country codes and localized names. */
  private static staticDataSource: { countryCode: string, name: string }[] = [];

  /**
   * Generates the `staticDataSource` of all country codes and localized names.
   */
  private static initializeDataSource(): void {
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

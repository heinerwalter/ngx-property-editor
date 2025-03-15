import { Component, Input, OnInit } from '@angular/core';
import { InputBaseWithValue } from '../input-base';
import * as languages from '@cospired/i18n-iso-languages';

@Component({
  selector: 'pe-language-input',
  templateUrl: './language-input.component.html',
  styleUrls: ['./language-input.component.scss'],
})
export class LanguageInputComponent extends InputBaseWithValue<string> implements OnInit {

  /** If true, multiple items can be selected. */
  @Input() public multiple: boolean = false;

  /** If true, an additional empty item is added to enable empty selection (`value == undefined`). */
  @Input() public allowEmpty: boolean = false;

  /**
   * Optional: Add this class to the select element.
   */
  @Input() public selectClass: string | undefined = undefined;

  /**
   * An array from which the user can select one or multiple items.
   */
  protected dataSource: any[] = [];

  public constructor() {
    super();
  }

  public ngOnInit(): void {
    if (!LanguageInputComponent.staticDataSource.length)
      LanguageInputComponent.initializeDataSource();
    this.dataSource = LanguageInputComponent.staticDataSource;
  }

  // region Static data source (generates only once)

  /** Static data source containing all language codes and localized names. */
  private static staticDataSource: { languageCode: string, name: string }[] = [];

  /**
   * Generates the `staticDataSource` of all language codes and localized names.
   */
  private static initializeDataSource(): void {
    this.staticDataSource = [];

    // Build data source from all country codes
    const languagesDictionary: { [alpha2Key: string]: string } =
      languages.getNames(navigator.language);
    for (let languageCode in languagesDictionary) {
      if (!languagesDictionary.hasOwnProperty(languageCode)) continue;
      this.staticDataSource.push({
        languageCode: languageCode.toLowerCase(),
        name: languagesDictionary[languageCode],
      });
    }
  }

  // endregion

}

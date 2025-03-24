import { Component, Input, OnInit } from '@angular/core';
import { SelectInputBase } from '../../input-base';
import * as languages from '@cospired/i18n-iso-languages';

@Component({
  selector: 'pe-language-select-input',
  templateUrl: './language-select-input.component.html',
  styleUrls: ['./language-select-input.component.scss'],
})
export class LanguageSelectInputComponent extends SelectInputBase<string> implements OnInit {

  /**
   * Optional: Add this class to the select element.
   */
  @Input() public selectClass: string | undefined = undefined;

  /**
   * An array from which the user can select one or multiple items.
   */
  protected dataSource: any[] = [];

  /**
   * Returns a single selected value as string (language code for use in the language icon).
   * If `multiple == true`, undefined is returned.
   */
  protected get languageCode(): string | undefined {
    if (!this.value || typeof this.value !== 'string') return undefined;
    return this.value;
  }

  public constructor() {
    super();
  }

  public ngOnInit(): void {
    LanguageSelectInputComponent.initializeDataSource();
    this.dataSource = LanguageSelectInputComponent.staticDataSource;
  }

  // region Static data source (generates only once)

  /**
   * Returns the human-readable name of the language with the given language code.
   * Returns undefined, if the given language code is invalid.
   * @param languageCode ISO 639 language code (two character string).
   * @returns Human-readable language name.
   */
  public static getLanguageName(languageCode: string): string | undefined {
    if (!languageCode) return undefined;
    return languages.getName(languageCode, navigator.language);
  }

  /** Static data source containing all language codes and localized names. */
  private static staticDataSource: { languageCode: string, name: string }[] = [];

  /**
   * Generates the `staticDataSource` of all language codes and localized names.
   */
  private static initializeDataSource(): void {
    if (this.staticDataSource.length)
      return;

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

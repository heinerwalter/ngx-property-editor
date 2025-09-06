import { Component, Input } from '@angular/core';

import * as countries from 'i18n-iso-countries';
import * as countries_en from 'i18n-iso-countries/langs/en.json';
import * as countries_de from 'i18n-iso-countries/langs/de.json';
import * as languages from '@cospired/i18n-iso-languages';
import * as language_en from '@cospired/i18n-iso-languages/langs/en.json';
import * as language_de from '@cospired/i18n-iso-languages/langs/de.json';


@Component({
  selector: 'demo-root',
  templateUrl: './demo-app.component.html',
  styleUrls: ['./demo-app.component.scss'],
})
export class DemoAppComponent {

  public constructor() {
    // Register english and german country names.
    // See https://www.npmjs.com/package/i18n-iso-countries
    countries.registerLocale(countries_en);
    countries.registerLocale(countries_de);

    // Register english and german language names.
    // See https://www.npmjs.com/package/@cospired/i18n-iso-languages
    languages.registerLocale(language_en);
    languages.registerLocale(language_de);
  }
 
}

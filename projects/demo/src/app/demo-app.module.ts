import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PropertyEditorModule } from 'ngx-property-editor';

import { DemoAppComponent } from './demo-app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import * as countries from 'i18n-iso-countries';
import * as countries_en from 'i18n-iso-countries/langs/en.json';
import * as countries_de from 'i18n-iso-countries/langs/de.json';
import * as languages from '@cospired/i18n-iso-languages';
import * as language_en from '@cospired/i18n-iso-languages/langs/en.json';
import * as language_de from '@cospired/i18n-iso-languages/langs/de.json';

import { components } from './components/components';

/**
 * Demo application module.
 */
@NgModule({
  declarations: [
    DemoAppComponent,
    ...components,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot([]),
    PropertyEditorModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [DemoAppComponent],
})
export class DemoAppModule {
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

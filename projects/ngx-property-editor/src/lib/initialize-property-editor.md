Example for initialization of the localization of packages
used by the PropertyEditorModule.

```js
import * as countries from 'i18n-iso-countries';
import * as countries_en from 'i18n-iso-countries/langs/en.json';
import * as countries_de from 'i18n-iso-countries/langs/de.json';
import * as languages from '@cospired/i18n-iso-languages';
import * as language_en from '@cospired/i18n-iso-languages/langs/en.json';
import * as language_de from '@cospired/i18n-iso-languages/langs/de.json';

// Register english and german country names
// for the <pe-country-select-input>.
// See https://www.npmjs.com/package/i18n-iso-countries
countries.registerLocale(countries_en);
countries.registerLocale(countries_de);

// Register english and german language names
// for the <pe-language-select-input>.
// See https://www.npmjs.com/package/@cospired/i18n-iso-languages
languages.registerLocale(language_en);
languages.registerLocale(language_de);
```
 
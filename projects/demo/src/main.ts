/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DemoAppModule } from './app/demo-app.module';


platformBrowserDynamic().bootstrapModule(DemoAppModule)
  .catch(err => console.error(err));

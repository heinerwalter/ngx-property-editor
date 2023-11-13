import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PropertyEditorModule } from 'ngx-property-editor';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { components } from "./components/components";

/**
 * Demo application module.
 */
@NgModule({
  declarations: [
    AppComponent,
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
  bootstrap: [AppComponent],
})
export class AppModule {
}

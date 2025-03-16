import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PropertyEditorModule } from 'ngx-property-editor';

import { DemoAppComponent } from './demo-app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';

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
    // Angular modules:
    BrowserModule, // Angular platform browser
    BrowserAnimationsModule, // Angular platform browser animations (required by Toastr)
    RouterModule.forRoot([]), // Angular router
    FormsModule, // Angular forms
    // 3rd party modules:
    FontAwesomeModule, // FontAwesome
    NgbModule, // Bootstrap
    ToastrModule.forRoot(), // Toastr
    SweetAlert2Module.forRoot(), // SweetAlert2 for Angular
    // My own modules:
    PropertyEditorModule,
  ],
  providers: [],
  bootstrap: [DemoAppComponent],
})
export class DemoAppModule {
}

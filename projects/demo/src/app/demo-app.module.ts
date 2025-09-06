import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { PropertyEditorModule } from 'ngx-property-editor';

import { DemoAppComponent } from './demo-app.component';
import { components } from './components/components';
import { routes } from './demo-routes';

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
    RouterModule.forRoot(routes, { useHash: true }), // Angular router
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

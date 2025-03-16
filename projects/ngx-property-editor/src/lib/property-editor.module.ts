import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';

import { components } from './components/components';


@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    // Angular modules:
    CommonModule,
    FormsModule, // Angular forms
    RouterModule, // Angular router
    // 3rd party modules:
    FontAwesomeModule, // FontAwesome
    NgbModule, // Bootstrap
    ToastrModule, // Toastr
    SweetAlert2Module, // SweetAlert2
  ],
  exports: [
    ...components,
  ],
})
export class PropertyEditorModule {
}

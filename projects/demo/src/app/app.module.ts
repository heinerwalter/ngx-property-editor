import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PropertyEditorModule } from 'ngx-property-editor';

import { AppComponent } from './app.component';
import { TerminalComponent } from './components/terminal/terminal.component';
import { InputComponentsComponent } from './components/input-components/input-components.component';


@NgModule({
  declarations: [
    AppComponent,
    TerminalComponent,
    InputComponentsComponent
  ],
  imports: [
    BrowserModule,
    PropertyEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

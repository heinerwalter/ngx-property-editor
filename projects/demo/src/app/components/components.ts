import { Type } from '@angular/core';
import { AllInputsDemoComponent } from './all-inputs-demo/all-inputs-demo.component';
import { ContainerDemoAccordionComponent } from './container-demo-accordion/container-demo-accordion.component';
import { ContainerDemoPagesComponent } from './container-demo-pages/container-demo-pages.component';
import { ContainerDemoTabsComponent } from './container-demo-tabs/container-demo-tabs.component';
import { InputDemoWrapperComponent } from './input-demo-wrapper/input-demo-wrapper.component';
import { PageNavigationDemoComponent } from './page-navigation-demo/page-navigation-demo.component';
import { PropertyTableDemoComponent } from './property-table-demo/property-table-demo.component';
import { PropertyEditorDemoComponent } from './property-editor-demo/property-editor-demo.component';
import { LoginPageDemoComponent } from './login-page-demo/login-page-demo.component';
import { TerminalComponent } from './terminal/terminal.component';
import { PropertyTypesDemoComponent } from './property-types-demo/property-types-demo.component';

export const components: Array<Type<any> | any[]> = [
  AllInputsDemoComponent,
  ContainerDemoAccordionComponent,
  ContainerDemoPagesComponent,
  ContainerDemoTabsComponent,
  InputDemoWrapperComponent,
  PageNavigationDemoComponent,
  PropertyTableDemoComponent,
  PropertyEditorDemoComponent,
  PropertyTypesDemoComponent,
  LoginPageDemoComponent,
  TerminalComponent,
];

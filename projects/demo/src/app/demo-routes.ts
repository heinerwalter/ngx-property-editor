import { Routes } from "@angular/router";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { AllInputsDemoComponent } from "./components/all-inputs-demo/all-inputs-demo.component";
import { PropertyTableDemoComponent } from "./components/property-table-demo/property-table-demo.component";
import { PropertyTypesDemoComponent } from "./components/property-types-demo/property-types-demo.component";
import { PropertyEditorDemoComponent } from "./components/property-editor-demo/property-editor-demo.component";
import { PageNavigationDemoComponent } from "./components/page-navigation-demo/page-navigation-demo.component";
import { LoginPageDemoComponent } from "./components/login-page-demo/login-page-demo.component";

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'demo/input-components', component: AllInputsDemoComponent },
  { path: 'demo/property-table', component: PropertyTableDemoComponent },
  { path: 'demo/property-types', component: PropertyTypesDemoComponent },
  { path: 'demo/property-editor', component: PropertyEditorDemoComponent },
  { path: 'demo/page-navigation', component: PageNavigationDemoComponent },
  { path: 'demo/login-page', component: LoginPageDemoComponent },
];

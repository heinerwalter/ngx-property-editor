import { Type } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarItemComponent } from './navbar-item/navbar-item.component';

export const navbarComponents: Array<Type<any> | any[]> = [
  NavbarComponent,
  NavbarItemComponent,
];

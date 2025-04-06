import { Type } from '@angular/core';
import { itemViewComponents } from './item-views/item-views.components';
import { navbarComponents } from './navbar/navbar.components';
import { ButtonComponent } from './button/button.component';
import { ButtonGroupComponent } from './button-group/button-group.component';
import { CollapseComponent } from './collapse/collapse.component';
import { ColumnComponent } from './column/column.component';
import { DropdownButtonComponent } from './dropdown-button/dropdown-button.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RowComponent } from './row/row.component';
import { PaginationComponent } from './pagination/pagination.component';

export const bootstrapComponents: Array<Type<any> | any[]> = [
  ...itemViewComponents,
  ...navbarComponents,
  ButtonComponent,
  ButtonGroupComponent,
  CollapseComponent,
  ColumnComponent,
  DropdownButtonComponent,
  LoginPageComponent,
  PaginationComponent,
  RowComponent,
];

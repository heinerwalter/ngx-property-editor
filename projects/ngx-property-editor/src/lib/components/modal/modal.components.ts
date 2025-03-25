import { Type } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { MovableModalComponent } from './movable-modal/movable-modal.component';
import { AboutDialogComponent } from './about-dialog/about-dialog.component';

export const modalComponents: Array<Type<any> | any[]> = [
  ModalComponent,
  MovableModalComponent,
  AboutDialogComponent,
];

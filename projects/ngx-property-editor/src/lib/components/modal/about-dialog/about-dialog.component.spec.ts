import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDialogComponent } from './about-dialog.component';
import { ModalComponent } from '../modal/modal.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

describe('AboutDialogComponent', () => {
  let component: AboutDialogComponent;
  let fixture: ComponentFixture<AboutDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SweetAlert2Module
      ],
      declarations: [
        AboutDialogComponent,
        ModalComponent,
      ],
    });
    fixture = TestBed.createComponent(AboutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

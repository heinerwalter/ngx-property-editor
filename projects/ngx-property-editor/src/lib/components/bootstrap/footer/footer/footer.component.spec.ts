import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { AboutDialogComponent } from '../../../modal/about-dialog/about-dialog.component';
import { ModalComponent } from '../../../modal/modal/modal.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        FooterComponent,
        AboutDialogComponent,
        ModalComponent,
      ],
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

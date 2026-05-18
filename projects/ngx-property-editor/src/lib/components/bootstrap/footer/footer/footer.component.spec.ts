import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { AboutDialogComponent } from '../about-dialog/about-dialog.component';
import { AppServicesTestingModule } from '../../../services/app-services-testing.module.spec';
import { ModalComponent } from '../../visual/modal/modal.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppServicesTestingModule,
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

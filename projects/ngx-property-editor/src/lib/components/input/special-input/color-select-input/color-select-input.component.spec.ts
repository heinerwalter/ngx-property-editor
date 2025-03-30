import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSelectInputComponent } from './color-select-input.component';
import { SelectInputComponent } from '../../select-input/select-input.component';
import { FormGroupComponent } from '../../form-group/form-group.component';
import { FormsModule } from '@angular/forms';
import { SelectInputWithIconComponent } from '../../select-input-with-icon/select-input-with-icon.component';
import { ColorIconComponent } from '../../../icon/color-icon/color-icon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('ColorSelectInputComponent', () => {
  let component: ColorSelectInputComponent;
  let fixture: ComponentFixture<ColorSelectInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ColorSelectInputComponent,
        SelectInputWithIconComponent,
        ColorIconComponent,
        SelectInputComponent,
        FormGroupComponent,
      ],
      imports: [
        FormsModule,
        NgbModule,
      ],
    });
    fixture = TestBed.createComponent(ColorSelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

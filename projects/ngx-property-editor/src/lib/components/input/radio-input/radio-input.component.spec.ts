import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioInputComponent } from './radio-input.component';
import { FormGroupComponent } from '../form-group/form-group.component';
import { SingleRadioInputComponent } from '../single-radio-input/single-radio-input.component';

describe('RadioInputComponent', () => {
  let component: RadioInputComponent;
  let fixture: ComponentFixture<RadioInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RadioInputComponent,
        FormGroupComponent,
        SingleRadioInputComponent,
      ],
    });
    fixture = TestBed.createComponent(RadioInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

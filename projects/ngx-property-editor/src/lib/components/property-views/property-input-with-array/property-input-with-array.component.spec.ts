import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyInputWithArrayComponent } from './property-input-with-array.component';
import { PropertyInputComponent } from '../property-input/property-input.component';
import { inputComponents } from '../../input/input.components';
import { FormsModule } from '@angular/forms';

describe('PropertyInputWithArrayComponent', () => {
  let component: PropertyInputWithArrayComponent;
  let fixture: ComponentFixture<PropertyInputWithArrayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PropertyInputWithArrayComponent,
        PropertyInputComponent,
        ...inputComponents,
      ],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(PropertyInputWithArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyInputWithArrayComponent } from './property-input-with-array.component';
import { PropertyInputComponent } from '../property-input/property-input.component';
import { inputComponents } from '../../input/input.components';
import { FormsModule } from '@angular/forms';
import {
  PropertyInputWithInputGroupComponent,
} from '../property-input-with-input-group/property-input-with-input-group.component';

describe('PropertyInputWithArrayComponent', () => {
  let component: PropertyInputWithArrayComponent;
  let fixture: ComponentFixture<PropertyInputWithArrayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PropertyInputWithArrayComponent,
        PropertyInputWithInputGroupComponent,
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

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyInputWithInputGroupComponent } from './property-input-with-input-group.component';
import { PropertyInputComponent } from '../property-input/property-input.component';
import { inputComponents } from '../../input/input.components';
import { FormsModule } from '@angular/forms';

describe('PropertyInputWithInputGroupComponent', () => {
  let component: PropertyInputWithInputGroupComponent;
  let fixture: ComponentFixture<PropertyInputWithInputGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PropertyInputWithInputGroupComponent,
        PropertyInputComponent,
        ...inputComponents,
      ],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(PropertyInputWithInputGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

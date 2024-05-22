import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyInputWithGroupComponent } from './property-input-with-group.component';
import { PropertyInputComponent } from '../property-input/property-input.component';
import { inputComponents } from '../../input/input.components';
import { FormsModule } from '@angular/forms';

describe('PropertyInputWithGroupComponent', () => {
  let component: PropertyInputWithGroupComponent;
  let fixture: ComponentFixture<PropertyInputWithGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PropertyInputWithGroupComponent,
        PropertyInputComponent,
        ...inputComponents,
      ],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(PropertyInputWithGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

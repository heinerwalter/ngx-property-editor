import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyValueComponent } from './property-value.component';
import { inputComponents } from '../../input/input.components';
import { FormsModule } from '@angular/forms';

describe('PropertyValueComponent', () => {
  let component: PropertyValueComponent;
  let fixture: ComponentFixture<PropertyValueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PropertyValueComponent,
        ...inputComponents,
      ],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(PropertyValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

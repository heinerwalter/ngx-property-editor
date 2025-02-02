import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTableComponent } from './property-table.component';
import { FormsModule } from '@angular/forms';
import { inputComponents } from '../../input/input.components';

describe('PropertyTableComponent', () => {
  let component: PropertyTableComponent;
  let fixture: ComponentFixture<PropertyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PropertyTableComponent,
        ...inputComponents,
      ],
      imports: [FormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

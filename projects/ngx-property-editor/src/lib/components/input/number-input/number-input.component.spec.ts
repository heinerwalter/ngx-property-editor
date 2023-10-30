import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberInputComponent } from './number-input.component';
import { FormGroupComponent } from '../form-group/form-group.component';
import { FormsModule } from '@angular/forms';

describe('NumberInputComponent', () => {
  let component: NumberInputComponent;
  let fixture: ComponentFixture<NumberInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        NumberInputComponent,
        FormGroupComponent,
      ],
      imports: [ FormsModule ],
    });
    fixture = TestBed.createComponent(NumberInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanInputComponent } from './boolean-input.component';
import { RadioInputComponent } from '../radio-input/radio-input.component';
import { FormsModule } from '@angular/forms';

describe('BooleanInputComponent', () => {
  let component: BooleanInputComponent;
  let fixture: ComponentFixture<BooleanInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BooleanInputComponent,
        RadioInputComponent,
      ],
      imports: [ FormsModule ],
    });
    fixture = TestBed.createComponent(BooleanInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

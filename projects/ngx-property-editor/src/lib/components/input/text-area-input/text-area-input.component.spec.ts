import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaInputComponent } from './text-area-input.component';
import { FormGroupComponent } from '../form-group/form-group.component';
import { FormsModule } from '@angular/forms';

describe('TextAreaInputComponent', () => {
  let component: TextAreaInputComponent;
  let fixture: ComponentFixture<TextAreaInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TextAreaInputComponent,
        FormGroupComponent,
      ],
      imports: [ FormsModule ],
    });
    fixture = TestBed.createComponent(TextAreaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

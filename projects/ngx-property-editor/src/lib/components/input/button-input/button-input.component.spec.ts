import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonInputComponent } from './button-input.component';
import { FormGroupComponent } from '../form-group/form-group.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../bootstrap/button/button.component';

describe('ButtonInputComponent', () => {
  let component: ButtonInputComponent;
  let fixture: ComponentFixture<ButtonInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ButtonInputComponent,
        ButtonComponent,
        FormGroupComponent,
      ],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(ButtonInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

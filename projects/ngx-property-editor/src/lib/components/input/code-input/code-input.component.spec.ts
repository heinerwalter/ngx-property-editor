import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeInputComponent } from './code-input.component';
import { FormGroupComponent } from '../form-group/form-group.component';
import { FormsModule } from '@angular/forms';

describe('CodeInputComponent', () => {
  let component: CodeInputComponent;
  let fixture: ComponentFixture<CodeInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CodeInputComponent,
        FormGroupComponent,
      ],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(CodeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

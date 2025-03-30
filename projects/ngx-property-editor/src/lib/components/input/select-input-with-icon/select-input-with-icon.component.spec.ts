import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectInputWithIconComponent } from './select-input-with-icon.component';
import { FormGroupComponent } from '../form-group/form-group.component';
import { FormsModule } from '@angular/forms';
import { SelectInputComponent } from '../select-input/select-input.component';

describe('SelectWithIconInputComponent', () => {
  let component: SelectInputWithIconComponent;
  let fixture: ComponentFixture<SelectInputWithIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SelectInputWithIconComponent,
        SelectInputComponent,
        FormGroupComponent,
      ],
      imports: [
        FormsModule,
      ],
    });
    fixture = TestBed.createComponent(SelectInputWithIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

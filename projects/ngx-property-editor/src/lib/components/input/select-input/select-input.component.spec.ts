import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectInputComponent } from './select-input.component';
import { FormGroupComponent } from '../form-group/form-group.component';
import { FormsModule } from '@angular/forms';

describe('SelectInputComponent', () => {
  let component: SelectInputComponent;
  let fixture: ComponentFixture<SelectInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SelectInputComponent,
        FormGroupComponent,
      ],
      imports: [ FormsModule ],
    });
    fixture = TestBed.createComponent(SelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownInputComponent } from './dropdown-input.component';
import { FormGroupComponent } from '../form-group/form-group.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

describe('DropdownInputComponent', () => {
  let component: DropdownInputComponent;
  let fixture: ComponentFixture<DropdownInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DropdownInputComponent,
        FormGroupComponent,
      ],
      imports: [
        FormsModule,
        FontAwesomeTestingModule,
      ],
    });
    fixture = TestBed.createComponent(DropdownInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

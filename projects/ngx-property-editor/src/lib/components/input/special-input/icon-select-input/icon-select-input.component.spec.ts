import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSelectInputComponent } from './icon-select-input.component';
import { SelectInputComponent } from '../../select-input/select-input.component';
import { FormGroupComponent } from '../../form-group/form-group.component';
import { FormsModule } from '@angular/forms';

describe('IconSelectInputComponent', () => {
  let component: IconSelectInputComponent;
  let fixture: ComponentFixture<IconSelectInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        IconSelectInputComponent,
        SelectInputComponent,
        FormGroupComponent,
      ],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(IconSelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

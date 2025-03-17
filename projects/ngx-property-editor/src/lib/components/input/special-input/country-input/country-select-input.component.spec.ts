import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySelectInputComponent } from './country-select-input.component';
import { FormsModule } from '@angular/forms';
import { FormGroupComponent } from '../../form-group/form-group.component';
import { SelectInputComponent } from '../../select-input/select-input.component';

describe('CountrySelectInputComponent', () => {
  let component: CountrySelectInputComponent;
  let fixture: ComponentFixture<CountrySelectInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        CountrySelectInputComponent,
        SelectInputComponent,
        FormGroupComponent,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountrySelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

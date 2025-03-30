import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySelectInputComponent } from './country-select-input.component';
import { FormsModule } from '@angular/forms';
import { FormGroupComponent } from '../../form-group/form-group.component';
import { SelectInputComponent } from '../../select-input/select-input.component';
import { SelectInputWithIconComponent } from '../../select-input-with-icon/select-input-with-icon.component';
import { CountryIconComponent } from '../../../icon/country-icon/country-icon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('CountrySelectInputComponent', () => {
  let component: CountrySelectInputComponent;
  let fixture: ComponentFixture<CountrySelectInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NgbModule,
      ],
      declarations: [
        CountrySelectInputComponent,
        SelectInputWithIconComponent,
        CountryIconComponent,
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

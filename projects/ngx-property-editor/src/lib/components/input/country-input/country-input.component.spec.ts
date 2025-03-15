import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryInputComponent } from './country-input.component';
import { FormsModule } from '@angular/forms';
import { FormGroupComponent } from '../form-group/form-group.component';

describe('CountryInputComponent', () => {
  let component: CountryInputComponent;
  let fixture: ComponentFixture<CountryInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        CountryInputComponent,
        FormGroupComponent,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

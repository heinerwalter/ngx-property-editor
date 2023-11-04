import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingInputComponent } from './rating-input.component';
import { FormGroupComponent } from '../form-group/form-group.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

describe('RatingInputComponent', () => {
  let component: RatingInputComponent;
  let fixture: ComponentFixture<RatingInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RatingInputComponent,
        FormGroupComponent,
      ],
      imports: [FontAwesomeTestingModule],
    });
    fixture = TestBed.createComponent(RatingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
